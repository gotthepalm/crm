import Sidebar from './_components/Sidebar';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';
import ThemeSwitcher from '@/src/components/ThemeSwitcher';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className='flex flex-col min-h-screen'>
			<div className='flex flex-1'>
				<Sidebar />
				<div className='flex-1 bg-zinc-100 dark:bg-zinc-800 ml-60'>
					<header className='w-full max-w-[calc(100%-240px)] h-20 bg-white dark:bg-zinc-900 border-b border-b-zinc-200 dark:border-b-zinc-700 fixed'>
						<div className='w-full h-full px-10 flex items-center justify-between'>
							<Link href='/'>
								<Image src={'/images/bloom-icon.svg'} height={40} width={40} alt='bloom icon' />
							</Link>
							<div className='flex gap-2'>
								<LanguageSwitcher />
								<ThemeSwitcher />
							</div>
						</div>
					</header>
					<main className='w-full mt-20'>{children}</main>
				</div>
			</div>
		</div>
	);
}
