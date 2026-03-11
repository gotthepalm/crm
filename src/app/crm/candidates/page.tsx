import Image from 'next/image';
import Link from 'next/link';
import CrmHeader from '@/src/app/CrmHeader';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Candidate from '@/src/app/crm/candidates/Candidate';

export default async function Candidates() {
	const session = await auth();
	if (!session?.user) redirect('/');
	const user = await prisma.user.findUnique({
		where: { id: session?.user?.id },
		include: {
			userCrm: {
				include: {
					candidates: {
						orderBy: {
							id: 'asc'
						}
					}
				},
			},
		},
	});
	return (
		<>
			<CrmHeader>
				<div className='w-full h-full max-w-[1600px] ml-10 mr-auto flex items-center justify-between'>
					<Link href='/' className='flex items-center gap-2'>
						<Image src={'/images/bloom-icon.svg'} height={40} width={40} alt='bloom icon' />
					</Link>
					<div className='flex items-center gap-8'>
						<div
							className='cursor-pointer hover:bg-zinc-100 transition-colors duration-200 px-6
						py-2 rounded-2xl text-lg flex items-center font-medium border border-zinc-300 gap-2'
						>
							Filter
						</div>
						<Link
							href={'/crm/candidates/add'}
							className='cursor-pointer hover:bg-zinc-100 transition-colors duration-200 px-6
						py-2 rounded-2xl text-lg flex items-center font-medium border border-zinc-300 gap-2'
						>
							Create New
						</Link>
					</div>
				</div>
			</CrmHeader>

			<div className='w-full max-w-[1500px] mt-30 mx-auto grid grid-cols-3  gap-6'>
				{user?.userCrm &&
					user.userCrm.candidates.map((candidate, i) => <Candidate key={i} candidate={candidate} />)}
			</div>
		</>
	);
}
