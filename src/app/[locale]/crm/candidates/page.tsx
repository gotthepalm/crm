import Image from 'next/image';
import Link from 'next/link';
import CrmHeader from '@/src/components/CrmHeader';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Candidate from '@/src/app/[locale]/crm/candidates/Candidate';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';
import { getTranslations } from 'next-intl/server';

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
							id: 'asc',
						},
					},
				},
			},
		},
	});
	const t = await getTranslations("Candidates");
	return (
		<>
			<CrmHeader>
				<div className='w-full h-full px-10 flex items-center justify-between'>
					<Link href='/'>
						<Image src={'/images/bloom-icon.svg'} height={40} width={40} alt='bloom icon' />
					</Link>
					<nav className='flex items-center gap-5'>
						<div
							className='cursor-pointer hover:bg-zinc-100 transition-colors duration-200 px-6
						py-2 rounded-2xl text-lg flex items-center font-medium border border-zinc-300 gap-2'
						>
							{t("Filter")}
						</div>
						<LanguageSwitcher />
					</nav>
				</div>
			</CrmHeader>
			<main className='w-full max-w-[1500px] mt-20 mx-auto p-5'>
				<Link
					href={'/crm/candidates/add'}
					className='flex justify-center items-center gap-3 bg-white hover:bg-purple-700 hover:text-white border border-zinc-300 text-[22px] p-3 mb-5 rounded-2xl w-full component-transition cursor-pointer'
				>
					<span className='text-4xl font-light'>+</span>
					{t("AddCandidate")}
				</Link>
				<li className='list-none w-full mx-auto grid grid-cols-3 gap-5'>
					{user?.userCrm &&
						user.userCrm.candidates.map((candidate, i) => <Candidate key={i} candidate={candidate} />)}
				</li>
			</main>
		</>
	);
}
