import { getTranslations } from 'next-intl/server';
import SidebarItem from '@/src/app/[locale]/crm/_components/SidebarItem';

export type navItem = {
	name: string;
	href: string;
	icon: string;
};

export default async function Sidebar() {
	const t = await getTranslations('Sidebar');
	const navItems: navItem[] = [
		{ name: t('Candidates'), href: '/crm/candidates', icon: 'mask-[url(/images/emoji-people.svg)]' },
		{ name: t('Vacancies'), href: '/crm/vacancies', icon: 'mask-[url(/images/vacancy.svg)]' },
		{ name: t('Meetings'), href: '/crm/meetings', icon: 'mask-[url(/images/adaptive-audio-mic.svg)]' },
		{ name: t('Sources'), href: '/crm/sources', icon: 'mask-[url(/images/dataset.svg)]' },
	];
	return (
		<aside className='w-60 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 px-5 py-10 fixed h-full'>
			<nav className='flex flex-col gap-3'>
				{navItems.map((item) => {
					return <SidebarItem key={item.name} item={item} />;
				})}
			</nav>
		</aside>
	);
}
