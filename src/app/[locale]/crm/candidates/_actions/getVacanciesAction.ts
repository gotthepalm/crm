'use server'

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function getVacancies() {
	const session = await auth()
	if (!session?.user) return

	// Getting vacancies from user

	return prisma.user.findUnique({
		where: {id: session.user.id},
		select: {
			userCrm: {
				select: {
					vacancies: {
						orderBy: {
							id: 'desc'
						}
					}
				}
			}
		}
	})
}