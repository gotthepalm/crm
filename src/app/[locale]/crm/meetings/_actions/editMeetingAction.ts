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
	| { result: 'db-error' }
	| { result: 'no-session' };


export async function editMeeting(formData: FormData, meetingId: number) {
	const t = await getTranslations('CreateMeeting');
	const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v);
	const meetingSchema = z.object({
		date: z.string().min(1, t('DateRequired')),
		time: z.string().min(1, t('TimeRequired')),
		url: z.preprocess(emptyToUndefined, z.url(t('InvalidUrl')).optional()),
		interviewType: z.enum(InterviewType),
		note: z.preprocess(emptyToUndefined, z.string().optional()),
		interviewers: z.array(z.string().trim().min(1, t('FillInput')).max(30, t('LongValue'))),
	});
	const session = await auth();

	if (!session?.user) {
		return { result: 'no-session' } satisfies ActionState;
	}

	const interviewers = formData.getAll('interviewers');

	const data = {
		...Object.fromEntries(formData),
		interviewers,
	};
	const parsedData = meetingSchema.safeParse(data);

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
			}
			else {
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

	const nulledData = Object.fromEntries(
		Object.entries(parsedData.data).map(([key, value]) => {
			if (key === 'interviewers') {
				return [key, value ?? []];
			}

			return [key, value === undefined ? null : value];
		}),
	);

	try {
		await prisma.meeting.update({
			where: {id: meetingId},
			data: {
				...nulledData,
				userCrm: {
					connect: {userId: session.user.id}
				}

			}
		})
		return { result: 'success' } satisfies ActionState;
	} catch {
		return { result: 'db-error' } satisfies ActionState;
	}
}
