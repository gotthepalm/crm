'use server';

import { z } from 'zod';
import { EmploymentType, VacancyStatus } from '@/src/generated/prisma/enums';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';

export type ActionState =
	| { result: 'success' }
	| { result: 'validation-error'; errors: Record<string, string[]>; values: Record<string, FormDataEntryValue> }
	| { result: 'invalid-candidates' }
	| { result: 'db-error' }
	| { result: 'no-session' };

export async function editVacancy(formData: FormData, vacancyId: number) {
	const t = await getTranslations('CreateVacancy');

	// Zod validation

	const emptyToUndefined = (val: unknown) => (typeof val === 'string' && val.trim() === '' ? undefined : val);
	const vacancySchema = z.object({
		position: z.string().trim().min(1, t('PositionRequired')).max(80, t('LongPosition')),
		description: z.preprocess(emptyToUndefined, z.string().trim().optional()),
		location: z.preprocess(emptyToUndefined, z.string().trim().optional()),
		employmentType: z.preprocess(emptyToUndefined, z.enum(EmploymentType, t('InvalidEmploymentType')).optional()),
		salaryFrom: z.preprocess(
			emptyToUndefined,
			z.coerce.number().min(0, t('SmallValue')).max(2_147_483_647, t('BigValue')).optional(),
		),
		salaryTo: z.preprocess(
			emptyToUndefined,
			z.coerce.number().min(0, t('SmallValue')).max(2_147_483_647, t('BigValue')).optional(),
		),
		experienceYears: z.preprocess(
			emptyToUndefined,
			z.coerce.number().min(0, t('SmallValue')).max(2_147_483_647, t('BigValue')).optional(),
		),
		status: z.enum(VacancyStatus, t('InvalidStatus')),
	});
	const candidatesSchema = z.array(z.preprocess(emptyToUndefined, z.coerce.number().optional()));

	// Checking session

	const session = await auth();
	if (!session?.user) {
		return { result: 'no-session' } satisfies ActionState;
	}

	// Getting and validating data

	const data = Object.fromEntries(formData);
	const candidates = formData.getAll('candidates');

	const parsedData = vacancySchema.safeParse(data);
	const candidatesParsed = candidatesSchema.safeParse(candidates);

	if (!parsedData.success) {
		return {
			result: 'validation-error',
			errors: parsedData.error.flatten().fieldErrors,
			values: data,
		} satisfies ActionState;
	}
	if (!candidatesParsed.success) {
		return { result: 'invalid-candidates' } satisfies ActionState;
	}

	const nulledData = Object.fromEntries(
		Object.entries(parsedData.data).map(([key, value]) => [key, value === undefined ? null : value]),
	);

	// Checking whether the user has all the candidates he wants to link to the vacancy

	const userCandidates = await prisma.user.findUnique({
		where: { id: session.user.id },
		select: {
			userCrm: {
				select: {
					candidates: {
						select: {
							id: true,
						},
					},
				},
			},
		},
	});
	const userCandidateIds = userCandidates?.userCrm?.candidates.map((c) => c.id) ?? [];

	// Only candidates that exist in userCandidates
	const filteredCandidates = [
		...new Set(
			candidatesParsed.data.filter(
				(item): item is number => item !== undefined && userCandidateIds.includes(item),
			),
		),
	];

	// Updating vacancy

	try {
		if (filteredCandidates.length) {
			await prisma.vacancy.update({
				where: { id: vacancyId },
				data: {
					...nulledData,
					candidates: {
						set: [
							...filteredCandidates.map((item) => ({
								id: item,
							})),
						],
					},
				},
			});
			return { result: 'success' } satisfies ActionState;
		}
		await prisma.vacancy.update({
			where: { id: vacancyId },
			data: {
				...nulledData,
				candidates: {
					set: [],
				},
			},
		});
		return { result: 'success' } satisfies ActionState;
	} catch {
		return { result: 'db-error' } satisfies ActionState;
	}
}
