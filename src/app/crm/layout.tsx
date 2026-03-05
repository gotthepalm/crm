import Link from 'next/link';
import Sidebar from './Sidebar';
import Image from 'next/image';
import { Gelasio } from 'next/font/google';

const charisSIL = Gelasio({
	weight: ['400', '500', '600', '700'],
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className='flex flex-col min-h-screen'>
			<header className='flex items-center w-full border-b border-zinc-300 h-20 px-5'>
				<Link href='/' className='flex items-center gap-2'>
					<Image src={'/images/bloom-icon.svg'} height={50} width={50} alt='bloom icon' />
					<div className={`${charisSIL.className} text-[40px] text-4xl font-medium text-center text-black`}>
						Bloom CRM
					</div>
				</Link>
			</header>
			<main className='flex flex-1'>
				<Sidebar />
				<div className='flex-1 p-5 bg-gray-100'>{children}</div>
			</main>
		</div>
	);
}
