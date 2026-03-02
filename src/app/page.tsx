import AnimatedText from '@/src/components/AnimatedText';
import Link from 'next/link';

export default function Home() {
	const session = 'bembembem' // тут будет сессия
    return (
		<div className="p-50 flex items-center justify-center px-6">
			<section className="max-w-4xl w-full text-center flex flex-col items-center">

				{/* Logo placeholder
				<div className='flex items-center gap-3 mb-10'>
					<Image src={'/images/bloom-icon.svg'} height={90} width={90} alt='bloom icon' />
					<div className={`${charisSIL.className} text-[80px] font-semibold text-center text-black`}>
						Bloom CRM
					</div>
					<AnimatedText/>
				</div>*/}

				{/* Headline */}
				<h1 className="text-4xl flex flex-col items-center sm:text-6xl font-bold leading-tight tracking-tight mb-10">
					<div className='text-black'>The CRM platform</div>
					<AnimatedText/>
				</h1>

				{/* Description */}
				<p className="mt-6 text-lg text-gray-500 max-w-2xl">
					Manage clients, automate workflows and scale your business
					with a clean, powerful and modern CRM system.
				</p>

				{/* CTA */}
				<div className="mt-10">
					<Link href={session ? '/crm' : '/log-in'} className="text-white cursor-pointer bg-purple-700 hover:bg-purple-900 transition-colors duration-200 px-8 py-4 rounded-xl text-lg font-medium">
						Let&apos;s try
					</Link>
				</div>

				{/* Sub text */}
				<p className="mt-4 text-sm text-gray-700">
					No credit card required
				</p>
			</section>
		</div>
    );
}
