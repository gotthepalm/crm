import CrmHeader from '@/src/components/CrmHeader';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Vacancy from '@/src/app/[locale]/crm/vacancies/_components/Vacancy';
import { getTranslations } from 'next-intl/server';

export default async function Candidates() {
	const session = await auth();
	if (!session?.user) redirect('/');
	const user = await prisma.user.findUnique({
		where: { id: session?.user?.id },
		select: {
			userCrm: {
				select: {
					vacancies: {
						include: {
							candidates: {
								orderBy: {
									id: 'desc',
								},
							},
						},
						orderBy: {
							id: 'desc',
						},
					},
				},
			},
		},
	});
	const t = await getTranslations('Vacancies');

	return (
		<>
			<CrmHeader>
				<div className='w-full h-full px-10 flex items-center justify-between'>
					<Link href='/'>
						<Image src={'/images/bloom-icon.svg'} height={40} width={40} alt='bloom icon' />
					</Link>
					<LanguageSwitcher />
				</div>
			</CrmHeader>

			<main className='w-full max-w-[1500px] mt-20 mx-auto p-5'>
				<Link
					href={'/crm/vacancies/add'}
					className='flex justify-center items-center gap-3 bg-white hover:bg-purple-700 hover:text-white border border-zinc-300 text-[22px] p-3 mb-5 rounded-2xl w-full component-transition cursor-pointer'
				>
					<span className='text-4xl font-light'>+</span>
					{t('AddVacancy')}
				</Link>
				<li className='list-none w-full mx-auto grid grid-cols-3 gap-5'>
					{user?.userCrm && user.userCrm.vacancies.map((vacancy, i) => <Vacancy key={i} vacancy={vacancy} />)}
				</li>
			</main>
		</>
	);
}
