'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
	{ name: 'Candidates', href: '/crm/candidates', icon: 'emoji_people' },
	{ name: 'Vacancies', href: '/crm/vacancies', icon: 'article_person' },
	{ name: 'Meetings', href: '/crm/meetings', icon: 'adaptive_audio_mic' },
	{ name: 'Notes', href: '/crm/notes', icon: 'stylus_note' },
	{ name: 'Sources', href: '/crm/sources', icon: 'dataset' },
	{ name: 'Settings', href: '/crm/settings', icon: 'settings' },
];

export default function Sidebar() {
	const pathname = usePathname();
	return (
		<aside className='w-60 bg-white border-r border-gray-200 p-5'>
			<nav className='flex flex-col gap-3'>
				{navItems.map((item) => {
					const isActive = pathname.startsWith(item.href);
					return (
						<Link
							key={item.name}
							href={item.href}
							className={`flex items-center gap-3 px-4 py-3 text-[18px] rounded-xl component-transition 
							${isActive ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
						>
							<span className='material-symbols-rounded'>{item.icon}</span>
							{item.name}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
