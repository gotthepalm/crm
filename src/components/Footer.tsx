import Image from 'next/image';
import Link from 'next/link';
import { Gelasio } from 'next/font/google';

const gelasio = Gelasio({
	weight: ['400', '500', '600', '700'],
});

export default function Footer() {
    return (
		<footer className='py-10 border-t border-zinc-300 text-[16px] text-zinc-800'>
			<div className='max-w-6xl w-full mx-auto px-5'>
				<div className='grid grid-cols-[28%_18%_18%_18%_18%] mb-10'>
					<div>
						<div className='flex items-center gap-2'>
							<Image src={'/images/bloom-icon.svg'} height={40} width={40} alt='bloom icon' />
							<div
								className={`${gelasio.className} text-[26px] text-4xl font-medium text-center text-black`}
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
    )
}