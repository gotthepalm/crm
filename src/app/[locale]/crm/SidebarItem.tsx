"use client"

import Image from 'next/image';
import Link from 'next/link';
import { navItem } from '@/src/app/[locale]/crm/Sidebar';
import { usePathname } from 'next/navigation';

export default function SidebarItem({ item }: { item: navItem }) {
	const pathname = usePathname()

	const normalizedPathname = pathname.replace(/^\/(uk)(?=\/|$)/, '')

	const isActive =
		normalizedPathname === item.href ||
		normalizedPathname.startsWith(item.href + '/')

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
}