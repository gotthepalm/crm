'use server';

import { prisma } from '@/lib/prisma';

export async function getDbMeetingValues(meetingId: number) {
	return prisma.meeting.findUnique({
		where: { id: meetingId },
	});
}
