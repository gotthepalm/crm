'use server'

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export default async function deleteSource(sourceId: number) {
	await prisma.source.delete({
		where: {id: sourceId}
	})
	revalidatePath('/crm/sources')
}