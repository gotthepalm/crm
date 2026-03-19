'use server'

import { prisma } from '@/lib/prisma';

export async function getDbValues(candidateId: number ) {
	return prisma.candidate.findUnique({
		where: { id: candidateId }
	});
}