import { signIn } from '@/auth';
import { Gelasio } from 'next/font/google';

const gelasio = Gelasio({
	weight: ['400', '500', '600', '700'],
});

export default function LogIn() {
	return (
		<main className='h-dvh w-dvw flex'>
			<div className='h-full w-1/3 flex items-center justify-center bg-[url(/images/bg-bloom.svg)] bg-clip-content bg-center bg-no-repeat'></div>
			<div className='h-full w-2/3 flex items-center justify-center'>
				<div className='max-w-[500px] w-full mx-auto'>
					<div className='w-full flex flex-col items-center gap-2'>
						<div className='flex items-center gap-2 mb-12'>
							<span className='block h-16 w-16 mask-[url(/images/bloom-icon.svg)] mask-contain mask-center mask-no-repeat bg-purple-700'></span>
							<div className={`${gelasio.className} text-5xl font-medium text-center text-black`}>
								Bloom CRM
							</div>
						</div>
						<div className='flex flex-col items-center mb-6'>
							<h1 className='text-3xl text-center'>Sign in to continue</h1>
							<div className='text-[16px] text-zinc-500'>or create new account</div>
						</div>
						<form
							className='w-full'
							action={async () => {
								'use server';
								await signIn('google', { redirectTo: '/crm' });
							}}
						>
							<button
								type='submit'
								className='w-full cursor-pointer flex items-center justify-center gap-3 border border-zinc-300 rounded-xl px-4 py-2 hover:bg-zinc-100 transition'
							>
								<span className='block h-8 w-8 bg-[url(/images/google.svg)] bg-center bg-contain bg-no-repeat'></span>
								Continue with Google
							</button>
						</form>
						<form
							className='w-full'
							action={async () => {
								'use server';
								await signIn('github', { redirectTo: '/crm' });
							}}
						>
							<button
								type='submit'
								className='w-full cursor-pointer flex items-center justify-center gap-3 border border-zinc-300 rounded-xl px-10 py-2 hover:bg-zinc-100 transition'
							>
								<span className='block h-8 w-8 bg-[url(/images/github.svg)] bg-center bg-contain bg-no-repeat'></span>
								Continue with GitHub
							</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
