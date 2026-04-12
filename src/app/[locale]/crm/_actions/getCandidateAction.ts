'use server';

import { prisma } from '@/lib/prisma';

export async function getCandidate(id: number) {
	// Getting candidate with their vacancy & meetings

	return prisma.candidate.findUnique({
		where: { id },
		include: {
			vacancy: {
				select: {
					position: true,
				},
			},
			meetings: {
				select: {
					id: true,
					time: true,
					date: true,
					interviewType: true,
				},
			},
		},
	});
}
