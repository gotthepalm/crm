import AnimatedText from '@/src/components/AnimatedText';
import Link from 'next/link';
import '@/src/css/index.css';
import Image from 'next/image';
import { auth, signOut } from '@/auth';
import Footer from '@/src/components/Footer';
import { Gelasio } from 'next/font/google';

const gelasio = Gelasio({
	weight: ['400', '500', '600', '700'],
});

export default async function Home() {
	const session = await auth();
	return (
		<>
			<header className='w-full border-b border-zinc-300'>
				<div className='flex items-center justify-between max-w-[1500px] w-full mx-auto h-[80px] px-5'>
					<Link href='/' className='flex items-center gap-2'>
						<Image src={'/images/bloom-icon.svg'} height={50} width={50} alt='bloom icon' />
						<div className={`${gelasio.className} text-4xl font-medium text-center text-black`}>
							Bloom CRM
						</div>
					</Link>
					{session?.user ? (
						<form
							action={async () => {
								'use server';
								await signOut();
							}}
						>
							<button
								className='cursor-pointer hover:bg-zinc-100 transition-colors duration-200 px-6
								 py-3 rounded-xl text-lg flex items-center font-medium border border-zinc-300 gap-2'
							>
								Sign Out
								<span className='block cursor-pointer h-5 w-5 bg-[url(/images/sign-out.svg)] bg-contain bg-no-repeat bg-center'></span>
							</button>
						</form>
					) : (
						<Link
							href={'/login'}
							className='text-white cursor-pointer bg-purple-700 hover:bg-purple-900 transition-colors duration-200 px-6 py-3 rounded-xl text-lg font-medium'
						>
							Log In
						</Link>
					)}
				</div>
			</header>
			<main className='flex-1'>
				<div className='p-50 flex items-center justify-center px-6'>
					<section className='max-w-4xl w-full text-center flex flex-col items-center'>
						<h1 className='text-4xl flex flex-col items-center sm:text-6xl font-bold leading-tight tracking-tight mb-10'>
							<div className='text-black'>The CRM platform</div>
							<AnimatedText words={['for growing teams', 'for modern startups', 'for powerful sales']} />
						</h1>
						<p className='mt-6 text-lg text-gray-500 max-w-2xl'>
							Manage clients, automate workflows and scale your business with a clean, powerful and modern
							CRM system.
						</p>
						<div className='mt-10'>
							<Link
								href={session?.user ? '/crm' : '/login'}
								className='text-white cursor-pointer bg-purple-700 hover:bg-purple-900 transition-colors duration-200 px-8 py-4 rounded-xl text-lg font-medium'
							>
								Try CRM
							</Link>
						</div>
						<p className='mt-4 text-sm text-gray-700'>No credit card required</p>
					</section>
				</div>
			</main>
			<Footer />
		</>
	);
}
