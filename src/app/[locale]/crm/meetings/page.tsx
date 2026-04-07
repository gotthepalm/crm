import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Meeting from '@/src/app/[locale]/crm/meetings/_components/Meeting';

export default async function Meetings() {
	const session = await auth();
	if (!session?.user) redirect('/');

	const user = await prisma.user.findUnique({
		where: { id: session.user.id },
		select: {
			userCrm: {
				select: {
					meetings: {
						include: {
							vacancy: {
								select: {
									id: true,
									position: true
								}
							},
							candidate: {
								select: {
									id: true,
									name: true
								}
							}
						},
						orderBy: {
							id: 'desc',
						},
					},
				},
			},
		},
	});
	const t = await getTranslations('Meetings');

	return (
		<div className='w-full max-w-[1500px] mx-auto p-5'>
			<Link
				href={'/crm/meetings/add'}
				className='flex justify-center items-center gap-3 bg-white hover:bg-purple-700 hover:text-white border border-zinc-300 text-[22px] p-3 mb-5 rounded-2xl w-full component-transition cursor-pointer'
			>
				<span className='text-4xl font-light'>+</span>
				{t('AddMeeting')}
			</Link>
			<li className='list-none w-full mx-auto grid grid-cols-3 gap-5'>
				{user?.userCrm && user.userCrm.meetings.map((meeting, i) => <Meeting key={i} meeting={meeting} />)}
			</li>
		</div>
	);
}
