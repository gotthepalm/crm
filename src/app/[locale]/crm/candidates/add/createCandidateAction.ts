'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { CandidateStatus } from '@/src/generated/prisma/enums';
import { z } from 'zod';
import { getTranslations } from 'next-intl/server';

export type ActionState =
	| { result: 'success' }
	| { result: 'validation-error'; errors: Record<string, string[]>, values: Record<string, FormDataEntryValue> }
	| { result: 'db-error' }
	| { result: 'no-session' };

export async function createCandidate(formData: FormData, locale: string) {
	const t = await getTranslations({locale, namespace: 'CreateCandidate'})
	const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v);
	const candidateSchema = z.object({
		name: z.string().trim().min(1, t('NameRequired')).max(40, t('LongName')),
		position: z.preprocess(emptyToUndefined, z.string().trim().optional()),
		email: z.preprocess(emptyToUndefined, z.email(t('InvalidEmail')).optional()),
		phone: z.preprocess(emptyToUndefined, z.string().trim().optional()),
		location: z.preprocess(emptyToUndefined, z.string().trim().optional()),
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
	const session = await auth();

	if (!session?.user) {
		return { result: 'no-session' } satisfies ActionState;
	}

	const data = Object.fromEntries(formData);
	const parsedData = candidateSchema.safeParse(data);

	if (!parsedData.success) {
		return { result: 'validation-error', errors: parsedData.error.flatten().fieldErrors, values: data } satisfies ActionState;
	}

	try {
		await prisma.candidate.create({
			data: {
				...parsedData.data,
				userCrm: {
					connect: { userId: session.user.id },
				},
			},
		});
		return { result: 'success' } satisfies ActionState;
	} catch {
		return { result: 'db-error' } satisfies ActionState;
	}
}
