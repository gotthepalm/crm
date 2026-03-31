'use server'

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function getCandidates() {
	const session = await auth()
	if (!session?.user) return

	// Getting vacancies from user

	return prisma.user.findUnique({
		where: {id: session.user.id},
		select: {
			userCrm: {
				select: {
					candidates: {
						include: {
							vacancy: true
						},
						orderBy: {
							id: 'desc'
						}
					}
				}
			}
		}
	})
}