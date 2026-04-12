'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteMeeting(meetingId: number) {
	await prisma.meeting.delete({
		where: { id: meetingId },
	});
	revalidatePath('/crm/meetings');
}
