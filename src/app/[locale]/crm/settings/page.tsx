import Image from 'next/image';

export default function Settings() {
	return (
		<div className='w-full max-w-[1500px] mx-auto p-5'>
			<li className='flex gap-3'>
				{/*<article className='flex items-center justify-center gap-3 p-5 max-w-50 w-full flex-shrink font-medium bg-white rounded-2xl border border-zinc-300'>*/}
				{/*	<Image src='/images/i18n.svg' alt='' height={25} width={25} />*/}
				{/*	<h2 className=''>Language</h2>*/}
				{/*</article>*/}
				<article className='flex items-center justify-center gap-3 p-5 max-w-50 w-full flex-shrink font-medium bg-white rounded-2xl border border-zinc-300'>
					<Image src='/images/settings.svg' alt='' height={35} width={35} />
					<h2 className=''>Settings</h2>
				</article>
				<article className='flex items-center justify-center gap-3 p-5 max-w-50 w-full flex-shrink font-medium bg-white rounded-2xl border border-zinc-300'>
					<Image src='/images/settings.svg' alt='' height={35} width={35} />
					<h2 className=''>Settings</h2>
				</article>
				<article className='flex items-center justify-center gap-3 p-5 max-w-50 w-full flex-shrink font-medium bg-white rounded-2xl border border-zinc-300'>
					<Image src='/images/settings.svg' alt='' height={35} width={35} />
					<h2 className=''>Settings</h2>
				</article>
			</li>
		</div>
	);
}
