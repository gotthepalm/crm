'use server'

import { prisma } from '@/lib/prisma';

export async function getMeeting(id: number) {

	// Getting candidate including vacancy

	return prisma.meeting.findUnique({
		where: {id},
		include: {
			vacancy: {
				select: {
					position: true
				}
			},
			candidate: {
				select: {
					name: true
				}
			}
		}
	})
}