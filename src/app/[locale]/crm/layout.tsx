import Sidebar from './_components/Sidebar';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className='flex flex-col min-h-screen'>
			<div className='flex flex-1'>
				<Sidebar />
				<div className='flex-1 bg-gray-100 ml-60'>
					<header className='w-full max-w-[calc(100%-240px)] h-20 bg-white border-b border-b-zinc-200 fixed'>
						<div className='w-full h-full px-10 flex items-center justify-between'>
							<Link href='/'>
								<Image src={'/images/bloom-icon.svg'} height={40} width={40} alt='bloom icon' />
							</Link>
							<LanguageSwitcher />
						</div>
					</header>
					<main className='w-full mt-20'>{children}</main>
				</div>
			</div>
		</div>
	);
}
