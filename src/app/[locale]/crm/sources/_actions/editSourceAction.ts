'use server';

import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export type ActionState =
	| { result: 'success' }
	| { result: 'validation-error'; errors: Record<string, string[]>; values: Record<string, FormDataEntryValue> }
	| { result: 'db-error' }
	| { result: 'no-session' };

export async function editSource(formData: FormData, sourceId: number) {
	const t = await getTranslations('CreateSource');
	const sourceSchema = z.object({
		name: z.string().trim().min(1, t('NameRequired')).max(40, t('LongName')),
		url: z.url(t('InvalidUrl')),
	});
	const session = await auth();

	if (!session?.user) {
		return { result: 'no-session' } satisfies ActionState;
	}

	const data = Object.fromEntries(formData);
	const parsedData = sourceSchema.safeParse(data);

	if (!parsedData.success) {
		return {
			result: 'validation-error',
			errors: parsedData.error.flatten().fieldErrors,
			values: data,
		} satisfies ActionState;
	}

	const nulledData = Object.fromEntries(
		Object.entries(parsedData.data).map(([key, value]) => [key, value === undefined ? null : value]),
	);

	try {
		await prisma.source.update({
			where: {id: sourceId},
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
