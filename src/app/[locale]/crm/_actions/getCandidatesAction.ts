'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function getCandidates() {
	const session = await auth();
	if (!session?.user) return;

	// Getting user candidates with their vacancy & meetings

	return prisma.user.findUnique({
		where: { id: session.user.id },
		select: {
			userCrm: {
				select: {
					candidates: {
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
						orderBy: {
							id: 'desc',
						},
					},
				},
			},
		},
	});
}
