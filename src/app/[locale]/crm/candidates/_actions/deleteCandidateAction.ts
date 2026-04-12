'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteCandidate(candidateId: number) {
	await prisma.candidate.delete({
		where: { id: candidateId },
	});
	revalidatePath('/crm/candidates');
}
