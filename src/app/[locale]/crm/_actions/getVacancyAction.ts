'use server'

import { prisma } from '@/lib/prisma';

export async function getVacancy(id: number) {

	// Getting candidate including vacancy

	return prisma.vacancy.findUnique({
		where: {id},
		include: {
			candidates: {
				select: {
					name: true
				}
			},
			meetings: {
				select: {
					id: true,
					time: true,
					date: true,
					interviewType: true
				}
			}
		}
	})
}