import Link from 'next/link';
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
								select: {
									id: true,
									name: true,
								},
							},
							meetings: {
								select: {
									id: true,
									time: true,
									date: true,
									interviewType: true,
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
		<div className='w-full max-w-[1500px] mx-auto p-5'>
			<Link
				href={'/crm/vacancies/add'}
				className='flex justify-center items-center gap-3 bg-white hover:bg-purple-700 dark:bg-zinc-900 hover:text-white
				 border border-zinc-300 dark:border-zinc-700 hover:border-transparent text-[22px] p-3 mb-5 rounded-2xl w-full component-transition cursor-pointer'
			>
				<span className='text-4xl font-light'>+</span>
				{t('AddVacancy')}
			</Link>
			<li className='list-none w-full mx-auto grid grid-cols-3 gap-5'>
				{user?.userCrm && user.userCrm.vacancies.map((vacancy, i) => <Vacancy key={i} vacancy={vacancy} />)}
			</li>
		</div>
	);
}
