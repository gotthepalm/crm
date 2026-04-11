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
		<div className='w-full max-w-[1500px] mx-auto p-5'>
			<AddSource />
			<li className='list-none w-full mx-auto grid grid-cols-5 gap-5'>
				{user?.userCrm && user.userCrm.sources.map((source, i) => <Source key={i} source={source} />)}
			</li>
		</div>
	);
}
