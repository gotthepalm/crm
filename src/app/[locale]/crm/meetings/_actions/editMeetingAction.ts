'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import { InterviewType } from '@/src/generated/prisma/enums';
import type { ZodError } from 'zod';

export type ActionState =
	| { result: 'success' }
	| {
			result: 'validation-error';
			errors: Record<string, string | (string | undefined)[]>;
			values: Record<string, FormDataEntryValue | FormDataEntryValue[]>;
	  }
	| { result: 'invalid-vacancy' }
	| { result: 'invalid-candidate' }
	| { result: 'db-error' }
	| { result: 'no-session' };

export async function editMeeting(formData: FormData, meetingId: number) {
	const t = await getTranslations('CreateMeeting');

	// Zod validation

	const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v);
	const meetingSchema = z.object({
		date: z.string().min(1, t('DateRequired')),
		time: z.string().min(1, t('TimeRequired')),
		url: z.preprocess(emptyToUndefined, z.url(t('InvalidUrl')).optional()),
		interviewType: z.enum(InterviewType),
		note: z.preprocess(emptyToUndefined, z.string().optional()),
		interviewers: z.array(z.string().trim().min(1, t('FillInput')).max(30, t('LongValue'))),
	});
	const vacancyIdSchema = z.preprocess(
		emptyToUndefined,
		z.coerce.number().min(0, t('SmallValue')).max(2_147_483_647, t('BigValue')).optional(),
	);
	const candidateIdSchema = z.preprocess(
		emptyToUndefined,
		z.coerce.number().min(0, t('SmallValue')).max(2_147_483_647, t('BigValue')).optional(),
	);

	// Checking session

	const session = await auth();
	if (!session?.user) {
		return { result: 'no-session' } satisfies ActionState;
	}

	// Getting and validating data

	const interviewers = formData.getAll('interviewers');
	const data = {
		...Object.fromEntries(formData),
		interviewers,
	};

	const parsedData = meetingSchema.safeParse(data);
	const vacancyIdParsed = vacancyIdSchema.safeParse(formData.get('vacancyId'));
	const candidateIdParsed = candidateIdSchema.safeParse(formData.get('candidateId'));

	function mapErrors(issues: ZodError['issues']) {
		const errors: Record<string, string | (string | undefined)[]> = {};

		for (const issue of issues) {
			const path = issue.path;
			const field = path[0];

			if (typeof field !== 'string') continue;

			if (path.length === 2 && typeof path[1] === 'number') {
				const index = path[1];
				if (!Array.isArray(errors[field])) {
					errors[field] = [];
				}
				(errors[field] as (string | undefined)[])[index] = issue.message;
			} else {
				errors[field] = issue.message;
			}
		}

		return errors;
	}

	if (!parsedData.success) {
		return {
			result: 'validation-error',
			errors: mapErrors(parsedData.error.issues),
			values: data,
		} satisfies ActionState;
	}
	if (!vacancyIdParsed.success) {
		return { result: 'invalid-vacancy' } satisfies ActionState;
	}
	if (!candidateIdParsed.success) {
		return { result: 'invalid-candidate' } satisfies ActionState;
	}

	// Checking whether the user has a vacancy to which they want to link a meeting

	const userVacancies = await prisma.user.findUnique({
		where: { id: session.user.id },
		select: {
			userCrm: {
				select: {
					vacancies: {
						select: {
							id: true,
						},
					},
				},
			},
		},
	});
	if (vacancyIdParsed.data) {
		if (!userVacancies?.userCrm?.vacancies.some((vacancy) => vacancy.id === vacancyIdParsed.data)) {
			return { result: 'invalid-vacancy' } satisfies ActionState;
		}
	}

	// Checking whether the user has a candidate to which they want to link a meeting

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
	if (candidateIdParsed.data) {
		if (!userCandidates?.userCrm?.candidates.some((candidate) => candidate.id === candidateIdParsed.data)) {
			return { result: 'invalid-candidate' } satisfies ActionState;
		}
	}

	const nulledData = Object.fromEntries(
		Object.entries(parsedData.data).map(([key, value]) => {
			if (key === 'interviewers') {
				return [key, value ?? []];
			}

			return [key, value === undefined ? null : value];
		}),
	);

	// Editing meeting

	try {
		if (vacancyIdParsed.data && candidateIdParsed.data) {
			await prisma.meeting.update({
				where: { id: meetingId },
				data: {
					...nulledData,
					vacancy: {
						connect: { id: vacancyIdParsed.data },
					},
					candidate: {
						connect: { id: candidateIdParsed.data },
					},
				},
			});
			return { result: 'success' } satisfies ActionState;
		}
		if (vacancyIdParsed.data) {
			await prisma.meeting.update({
				where: { id: meetingId },
				data: {
					...nulledData,
					vacancy: {
						connect: { id: vacancyIdParsed.data },
					},
					candidate: {
						disconnect: true
					}
				},
			});
			return { result: 'success' } satisfies ActionState;
		}
		if (candidateIdParsed.data) {
			await prisma.meeting.update({
				where: {id: meetingId},
				data: {
					...nulledData,
					candidate: {
						connect: {id: candidateIdParsed.data}
					},
					vacancy: {
						disconnect: true
					}
				}
			})
			return { result: 'success' } satisfies ActionState;
		}
		await prisma.meeting.update({
			where: { id: meetingId },
			data: {
				...nulledData,
				vacancyId: null,
				candidateId: null,
			},
		});
		return { result: 'success' } satisfies ActionState;
	} catch {
		return { result: 'db-error' } satisfies ActionState;
	}
}
