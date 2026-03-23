'use server';

import { z } from 'zod';
import { EmploymentType, VacancyStatus } from '@/src/generated/prisma/enums';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';

export type ActionState =
	| { result: 'success' }
	| { result: 'validation-error'; errors: Record<string, string[]>, values: Record<string, FormDataEntryValue> }
	| { result: 'db-error' }
	| { result: 'no-session' };

export async function editVacancy(formData: FormData, vacancyId: number) {
	const t = await getTranslations('CreateVacancy');
	const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v);
	const vacancySchema = z.object({
		// position: z.string().trim().min(1, t('PositionRequired')).max(40, t('LongName')),
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
	const session = await auth();

	if (!session?.user) {
		return { result: 'no-session' } satisfies ActionState;
	}

	const data = Object.fromEntries(formData);
	const parsedData = vacancySchema.safeParse(data);

	// errors: parsedData.error.flatten().fieldErrors, values: data

	if (!parsedData.success) {
		return { result: 'validation-error', errors: parsedData.error.flatten().fieldErrors, values: data } satisfies ActionState;
	}

	const nulledData = Object.fromEntries(
		Object.entries(parsedData.data).map(([key, value]) => [
			key,
			value === undefined ? null : value
		])
	)

	try {
		await prisma.vacancy.update({
			where: {id: vacancyId},
			data: {
				...nulledData,
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
