'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { CandidateStatus } from '@/src/generated/prisma/enums';
import { z } from 'zod';
import { getTranslations } from 'next-intl/server';

export type ActionState =
	| { result: 'success' }
	| { result: 'validation-error'; errors: Record<string, string[]>; values: Record<string, FormDataEntryValue> }
	| { result: 'invalid-vacancy' }
	| { result: 'db-error' }
	| { result: 'no-session' };

export async function editCandidate(formData: FormData, candidateId: number) {
	const t = await getTranslations('CreateCandidate');

	// Zod validation

	const emptyToUndefined = (val: unknown) => (typeof val === 'string' && val.trim() === '' ? undefined : val);
	const candidateSchema = z.object({
		name: z.string().trim().min(1, t('NameRequired')).max(40, t('LongName')),
		position: z.preprocess(emptyToUndefined, z.string().trim().optional()),
		email: z.preprocess(emptyToUndefined, z.email(t('InvalidEmail')).optional()),
		phone: z.preprocess(emptyToUndefined, z.string().trim().optional()),
		location: z.preprocess(emptyToUndefined, z.string().trim().optional()),
		age: z.preprocess(
			emptyToUndefined,
			z.coerce.number().min(0, t('SmallValue')).max(2_147_483_647, t('BigValue')).optional(),
		),
		skills: z.preprocess(emptyToUndefined, z.string().trim().optional()),
		experienceYears: z.preprocess(
			emptyToUndefined,
			z.coerce.number().min(0, t('SmallValue')).max(2_147_483_647, t('BigValue')).optional(),
		),
		salaryExpectationBottom: z.preprocess(
			emptyToUndefined,
			z.coerce.number().min(0, t('SmallValue')).max(2_147_483_647, t('BigValue')).optional(),
		),
		salaryExpectationTop: z.preprocess(
			emptyToUndefined,
			z.coerce.number().min(0, t('SmallValue')).max(2_147_483_647, t('BigValue')).optional(),
		),
		status: z.enum(CandidateStatus, t('InvalidStatus')),
		resumeUrl: z.preprocess(emptyToUndefined, z.url(t('InvalidUrl')).optional()),
		linkedinUrl: z.preprocess(emptyToUndefined, z.url(t('InvalidUrl')).optional()),
		gitHubUrl: z.preprocess(emptyToUndefined, z.url(t('InvalidUrl')).optional()),
		portfolioUrl: z.preprocess(emptyToUndefined, z.url(t('InvalidUrl')).optional()),
		note: z.preprocess(emptyToUndefined, z.string().trim().optional()),
	});
	const vacancyIdSchema = z.preprocess(
		emptyToUndefined,
		z.coerce.number().min(0, t('SmallValue')).max(2_147_483_647, t('BigValue')).optional(),
	);

	// Checking session

	const session = await auth();

	if (!session?.user) {
		return { result: 'no-session' } satisfies ActionState;
	}

	// Getting and validating data

	const data = Object.fromEntries(formData);

	const parsedData = candidateSchema.safeParse(data);
	const vacancyIdParsed = vacancyIdSchema.safeParse(formData.get('vacancyId'));

	if (!parsedData.success) {
		return {
			result: 'validation-error',
			errors: parsedData.error.flatten().fieldErrors,
			values: data,
		} satisfies ActionState;
	}
	if (!vacancyIdParsed.success) {
		return { result: 'invalid-vacancy' } satisfies ActionState;
	}

	const nulledData = Object.fromEntries(
		Object.entries(parsedData.data).map(([key, value]) => [key, value === undefined ? null : value]),
	);

	// Checking whether the user has a vacancy to which they want to link a candidate

	const userVacancies = await prisma.user.findUnique({
		where: { id: session.user.id },
		select: {
			userCrm: {
				select: {
					vacancies: true,
				},
			},
		},
	});
	if (vacancyIdParsed.data) {
		if (!userVacancies?.userCrm?.vacancies.some((vacancy) => vacancy.id === vacancyIdParsed.data)) {
			return { result: 'invalid-vacancy' } satisfies ActionState;
		}
	}

	// Updating candidate

	try {
		if (vacancyIdParsed.data) {
			await prisma.candidate.update({
				where: { id: candidateId },
				data: {
					...nulledData,
					vacancy: {
						connect: { id: vacancyIdParsed.data },
					},
				},
			});
			return { result: 'success' } satisfies ActionState;
		}
		await prisma.candidate.update({
			where: { id: candidateId },
			data: {
				...nulledData,
				vacancyId: null,
			},
		});
		return { result: 'success' } satisfies ActionState;
	} catch {
		return { result: 'db-error' } satisfies ActionState;
	}
}
