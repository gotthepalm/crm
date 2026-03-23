'use server';

import { prisma } from '@/lib/prisma';

export async function getDbVacancyValues(vacancyId: number) {
	return prisma.vacancy.findUnique({
		where: { id: vacancyId },
	});
}
