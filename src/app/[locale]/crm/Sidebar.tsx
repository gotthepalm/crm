'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'use-intl';

export default function Sidebar() {
	const pathname = usePathname();
	const t = useTranslations("Sidebar")
	const navItems = [
		{ name: t('Candidates'), href: '/crm/candidates', localedHref: '/uk/crm/candidates', icon: 'emoji_people' },
		{ name: t('Vacancies'), href: '/crm/vacancies', localedHref: '/uk/crm/vacancies', icon: 'article_person' },
		{ name: t('Meetings'), href: '/crm/meetings', localedHref: '/uk/crm/meetings', icon: 'adaptive_audio_mic' },
		{ name: t('Notes'), href: '/crm/notes', localedHref: '/uk/crm/notes', icon: 'stylus_note' },
		{ name: t('Sources'), href: '/crm/sources', localedHref: '/uk/crm/sources', icon: 'dataset' },
		{ name: t('Settings'), href: '/crm/settings', localedHref: '/uk/crm/settings', icon: 'settings' },
	];
	return (
		<aside className='w-60 bg-white border-r border-gray-200 px-5 py-10 fixed h-full'>
			<nav className='flex flex-col gap-3'>
				{navItems.map((item) => {
					const isActive = pathname.startsWith(item.href) || pathname.startsWith(item.localedHref);
					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex items-center gap-3 px-4 py-3 text-[18px] rounded-xl component-transition 
							${isActive ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
						>
							<Image src={`/images/${item.icon}.svg`} alt='' height={24} width={24} />
							{item.name}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
