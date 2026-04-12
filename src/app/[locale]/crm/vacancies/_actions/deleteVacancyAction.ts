'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteVacancy(vacancyId: number) {
	await prisma.vacancy.delete({
		where: { id: vacancyId },
	});
	revalidatePath('/crm/vacancies');
}
