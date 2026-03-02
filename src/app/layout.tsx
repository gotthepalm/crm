import type { Metadata } from 'next';
import { Roboto, Gelasio } from 'next/font/google';
import '@/src/css/index.css';
import Image from 'next/image';
import Link from 'next/link';

const roboto = Roboto({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
const charisSIL = Gelasio({
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Bloom CRM',
	description: 'Crm by gotthepalm & oladok-sites',
	icons: {
		icon: [
			{ url: '/favicons/favicon.ico' },
			{ url: '/favicons/favicon-16x16.png', sizes: '16x16' },
			{ url: '/favicons/favicon-32x32.png', sizes: '32x32' },
		],
		apple: '/favicon/apple-touch-icon.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto.className} text-[20px] bg-white min-h-screen flex flex-col`}>
				<header className='w-full border-b border-zinc-300'>
					<div className='flex items-center justify-between max-w-[1500px] w-full mx-auto h-[80px] px-5'>
						<Link href='/' className='flex items-center gap-2'>
							<Image src={'/images/bloom-icon.svg'} height={50} width={50} alt='bloom icon' />
							<div
								className={`${charisSIL.className} text-[40px] text-4xl font-medium text-center text-black`}
							>
								Bloom CRM
							</div>
						</Link>
						<Link href='/log-in' className="text-white cursor-pointer bg-purple-700 hover:bg-purple-900 transition-colors duration-200 px-6 py-3 rounded-xl text-lg font-medium">
							Log In
						</Link>
					</div>
				</header>
				<main className='flex-1'>{children}</main>
				<footer className='py-10 border-t border-zinc-300 text-[16px] text-zinc-800'>
					<div className='max-w-6xl w-full mx-auto px-5'>
						<div className='grid grid-cols-[28%_18%_18%_18%_18%] mb-10'>
							<div>
								<div className='flex items-center gap-2'>
									<Image src={'/images/bloom-icon.svg'} height={40} width={40} alt='bloom icon' />
									<div
										className={`${charisSIL.className} text-[26px] text-4xl font-medium text-center text-black`}
									>
										Bloom CRM
									</div>
								</div>
							</div>
							<div className='flex flex-col gap-2'>
								<Link href='/'>Home</Link>
								<Link href='/'>Crm</Link>
								<Link href='/'>Registration</Link>
								<Link href='/'>Companies</Link>
								<Link href='/'>Solo</Link>
							</div>
							<div className='flex flex-col gap-2'>
								<Link href='/'>Home</Link>
								<Link href='/'>Crm</Link>
								<Link href='/'>Registration</Link>
								<Link href='/'>Companies</Link>
								<Link href='/'>Solo</Link>
							</div>
							<div className='flex flex-col gap-2'>
								<Link href='/'>Home</Link>
								<Link href='/'>Crm</Link>
								<Link href='/'>Registration</Link>
								<Link href='/'>Companies</Link>
								<Link href='/'>Solo</Link>
							</div>
							<div>
								<div>Subscribe to newsletter</div>
								<form action=''>
									<input type='text' />
								</form>
							</div>
						</div>
						<div>©Bloom, Inc.</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
