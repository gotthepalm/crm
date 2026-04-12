'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItem } from '@/src/app/[locale]/crm/_components/Sidebar';

export default function SidebarItem({ item }: { item: navItem }) {
	const pathname = usePathname();

	const normalizedPathname = pathname.replace(/^\/(uk)(?=\/|$)/, '');

	const isActive = normalizedPathname === item.href || normalizedPathname.startsWith(item.href + '/');

	return (
		<Link
			key={item.name}
			href={item.href}
			className={`flex items-center gap-3 px-4 py-3 text-[18px] rounded-xl component-transition
				${isActive ? 'bg-zinc-200 font-medium dark:bg-zinc-700' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
		>
			<div
				className={`h-6 w-6 ${item.icon} mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
			></div>
			{item.name}
		</Link>
	);
}
