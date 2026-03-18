import SidebarItem from '@/src/app/[locale]/crm/SidebarItem';
import { getTranslations } from 'next-intl/server';

	export type navItem = {
		name: string;
		href: string;
		icon: string;
	}

export default async function Sidebar() {
	const t = await getTranslations("Sidebar")
	const navItems: navItem[] = [
		{ name: t('Candidates'), href: '/crm/candidates', icon: 'emoji_people' },
		{ name: t('Vacancies'), href: '/crm/vacancies', icon: 'article_person' },
		{ name: t('Meetings'), href: '/crm/meetings', icon: 'adaptive_audio_mic' },
		{ name: t('Notes'), href: '/crm/notes', icon: 'stylus_note' },
		{ name: t('Sources'), href: '/crm/sources', icon: 'dataset' },
		{ name: t('Settings'), href: '/crm/settings', icon: 'settings' },
	]
	return (
		<aside className='w-60 bg-white border-r border-gray-200 px-5 py-10 fixed h-full'>
			<nav className='flex flex-col gap-3'>
				{navItems.map((item) => {
					return (
						<SidebarItem key={item.name} item={item}/>
					);
				})}
			</nav>
		</aside>
	);
}
