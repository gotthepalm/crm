// "use client"

import Link from 'next/link';
import CrmHeader from '@/src/components/CrmHeader';
import Image from 'next/image';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Source from '@/src/app/[locale]/crm/sources/_components/Source';
import AddSource from '@/src/app/[locale]/crm/sources/_components/AddSource';

export default async function Sources() {
	const session = await auth();
	if (!session?.user) redirect('/');

	const user = await prisma.user.findUnique({
		where: { id: session.user.id },
		include: {
			userCrm: {
				include: {
					sources: {
						orderBy: {
							id: 'desc',
						},
					},
				},
			},
		},
	});

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
				<AddSource />
				<li className='list-none w-full mx-auto grid grid-cols-4 gap-5'>
					{user?.userCrm && user.userCrm.sources.map((source, i) => <Source key={i} source={source}/>)}
				</li>
			</main>
		</>
	);
}
