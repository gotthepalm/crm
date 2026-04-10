import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'use-intl';

export default function SettingsSidebar({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const t = useTranslations('Settings');

	const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

	return (
		<aside
			className={`fixed ${isOpen ? 'left-0' : '-left-60'} top-0 w-60 bg-white border-r border-gray-200 px-5 py-5 h-full z-50 component-transition`}
		>
			<button onClick={() => setIsOpen(false)} className='absolute top-3 left-3'>
				<Image src='/images/close.svg' alt='Close' width={25} height={25} />
			</button>
			<nav className='flex flex-col gap-3 mt-7'>
				<button
					onClick={() => setIsAccountOpen(!isAccountOpen)}
					className='px-4 py-3 text-[18px] rounded-xl component-transition
							hover:bg-gray-100'
				>
					<div className={`flex justify-between ${isAccountOpen && 'mb-3'}`}>
						<div className='flex items-center gap-3'>
							<Image src='/images/account.svg' alt='' height={24} width={24} />
							{t('Account')}
						</div>
						<Image src='/images/dropdown.svg' alt='' width={20} height={20} className={`component-transition ${isAccountOpen ? undefined : '-rotate-90'}`}/>
					</div>
					{isAccountOpen && (
						<div
							onClick={(e) => e.stopPropagation()}
							className='flex items-center gap-3 px-3 py-2 text-[16px] rounded-xl component-transition
							hover:bg-gray-100'
						>
							<Image src='/images/adaptive_audio_mic.svg' alt='' height={22} width={22} />
							Account
						</div>
					)}
				</button>
			</nav>
		</aside>
	);
}


/////// SIDEBAR WITH SETTINGS LIKE SIDEBAR



// 'use client';
//
// import { getTranslations } from 'next-intl/server';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useTranslations } from 'use-intl';
// import { useState } from 'react';
// import SettingsSidebar from '@/src/app/[locale]/crm/_components/SettingsSidebar';
//
// export type navItem = {
// 	name: string;
// 	href: string;
// 	icon: string;
// };
//
// export default function Sidebar() {
// 	const t = useTranslations('Sidebar');
// 	const navItems: navItem[] = [
// 		{ name: t('Candidates'), href: '/crm/candidates', icon: 'emoji_people' },
// 		{ name: t('Vacancies'), href: '/crm/vacancies', icon: 'vacancy' },
// 		{ name: t('Meetings'), href: '/crm/meetings', icon: 'adaptive_audio_mic' },
// 		{ name: t('Sources'), href: '/crm/sources', icon: 'dataset' },
// 		// { name: t('Settings'), href: '/crm/settings', icon: 'settings' },
// 	];
//
// 	const pathname = usePathname();
// 	const normalizedPathname = pathname.replace(/^\/(uk)(?=\/|$)/, '');
//
// 	const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
//
// 	return (
// 		<>
// 			<SettingsSidebar isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
// 			<aside className='w-60 bg-white border-r border-gray-200 px-5 py-10 fixed h-full'>
// 				<nav className='flex flex-col gap-3'>
// 					{navItems.map((item) => {
// 						const isActive =
// 							normalizedPathname === item.href || normalizedPathname.startsWith(item.href + '/');
// 						return (
// 							<Link
// 								key={item.name}
// 								href={item.href}
// 								className={`flex items-center gap-3 px-4 py-3 text-[18px] rounded-xl component-transition
// 							${isActive ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
// 							>
// 								<Image src={`/images/${item.icon}.svg`} alt='' height={24} width={24} />
// 								{item.name}
// 							</Link>
// 						);
// 					})}
// 					<button
// 						onClick={() => setIsSettingsOpen(true)}
// 						className='flex items-center gap-3 px-4 py-3 text-[18px] rounded-xl component-transition
// 							hover:bg-gray-100'
// 					>
// 						<Image src='/images/settings.svg' alt='' height={24} width={24} />
// 						{t('Settings')}
// 					</button>
// 				</nav>
// 			</aside>
// 		</>
// 	);
// }
//
