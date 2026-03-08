/*import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { VacancyCreateInput } from '@/src/generated/prisma/models/Vacancy';*/

export default async function Crm() {
	/*const session = await auth();
	if (!session?.user) redirect('/');
	const user = await prisma.user.findUnique({
		where: { id: session.user.id },
		include: {
			userCrm: {
				include: {
					candidates: true,
				},
			},
		},
	});
	if (!user?.userCrm) redirect('/');
	return (
		<div>
			<form
				action={async () => {
					await signIn('google');
				}}
			>
				<button>Auth with Gogel</button>
			</form>
			<form
				action={async () => {
					await signIn('github');
				}}
			>
				<button>Auth with Gogel</button>
			</form>
		</div>
	);*/
}
