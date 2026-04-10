import Link from 'next/link';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Candidate from '@/src/app/[locale]/crm/candidates/_components/Candidate';
import { getTranslations } from 'next-intl/server';

export default async function Candidates() {
	const session = await auth();
	if (!session?.user) redirect('/');

	const t = await getTranslations('Candidates');

	const user = await prisma.user.findUnique({
		where: { id: session?.user?.id },
		select: {
			userCrm: {
				select: {
					candidates: {
						include: {
							vacancy: {
								select: {
									id: true,
									position: true
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
						},
						orderBy: {
							id: 'desc',
						},
					},
				},
			},
		},
	});
	return (
		<div className='w-full max-w-[1500px] mx-auto p-5'>
			<Link
				href={'/crm/candidates/add'}
				className='flex justify-center items-center gap-3 bg-white hover:bg-purple-700 hover:text-white border border-zinc-300 text-[22px] p-3 mb-5 rounded-2xl w-full component-transition cursor-pointer'
			>
				<span className='text-4xl font-light'>+</span>
				{t('AddCandidate')}
			</Link>
			<li className='list-none w-full mx-auto grid grid-cols-3 gap-5'>
				{user?.userCrm &&
					user.userCrm.candidates.map((candidate) => <Candidate key={candidate.id} candidate={candidate} />)}
			</li>
		</div>
	);
}
