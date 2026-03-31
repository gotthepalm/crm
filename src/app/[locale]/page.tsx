import AnimatedText from '@/src/components/AnimatedText';
import Link from 'next/link';
import '@/src/css/index.css';
import Image from 'next/image';
import { auth, signOut } from '@/auth';
import Footer from '@/src/components/Footer';
import { Gelasio } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';

const gelasio = Gelasio({
	weight: ['400', '500', '600', '700'],
});

export default async function Home() {
	const t = await getTranslations('mainPage');
	const session = await auth();
	return (
		<>
			<header className='w-full border-b border-zinc-300'>
				<div className='flex items-center justify-between max-w-[1500px] w-full mx-auto h-[80px] px-5'>
					<Link href='/public' className='flex items-center gap-2'>
						<Image src={'/images/bloom-icon.svg'} height={50} width={50} alt='bloom icon' />
						<div className={`${gelasio.className} text-4xl font-medium text-center text-black`}>
							Bloom CRM
						</div>
					</Link>
					<div className='flex items-center gap-5'>
						{session?.user ? (
							<>
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
										{t('SignOut')}
										<span className='block cursor-pointer h-5 w-5 bg-[url(/images/sign-out.svg)] bg-contain bg-no-repeat bg-center'></span>
									</button>
								</form>
								<div className='h-10 w-10 bg-zinc-400 rounded-full overflow-hidden'>
									{session.user.image && <Image src={session.user.image} height={40} width={40} alt='' />}
								</div>
							</>
						) : (
							<Link
								href={'/login'}
								className='text-white cursor-pointer bg-violet-700 hover:bg-violet-800 transition-colors duration-200 px-6 py-3 rounded-xl text-lg font-medium'
							>
								{t('LogIn')}
							</Link>
						)}
						<LanguageSwitcher />
					</div>
				</div>
			</header>
			<main className='flex-1'>
				<div className='p-50 flex items-center justify-center px-6'>
					<section className='max-w-4xl w-full text-center flex flex-col items-center'>
						<h1 className='text-4xl flex flex-col items-center sm:text-6xl font-bold leading-tight tracking-tight mb-10'>
							<div className='text-black'>{t('Title')}</div>
							<AnimatedText words={[t('AnimatedText1'), t('AnimatedText2'), t('AnimatedText3')]} />
						</h1>
						<p className='mt-6 text-lg text-gray-500 max-w-2xl'>{t('PageDescr')}</p>
						<div className='mt-10'>
							<Link
								href={session?.user ? '/crm' : '/login'}
								className='text-white cursor-pointer bg-violet-700 hover:bg-violet-800 transition-colors duration-200 px-8 py-4 rounded-xl text-lg font-medium'
							>
								{t('ButtonText')}
							</Link>
						</div>
						<p className='mt-4 text-sm text-gray-700'>{t('ButtonDescr')}</p>
					</section>
				</div>
			</main>
			<Footer />
		</>
	);
}
