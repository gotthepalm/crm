'use server'

import { prisma } from '@/lib/prisma';

export async function getCandidateValues(candidateId: number ) {
	return prisma.candidate.findUnique({
		where: { id: candidateId }
	});
}