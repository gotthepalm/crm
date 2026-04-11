import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='h-dvh w-dvw flex items-center justify-center'>
			<div>
				<div className='text-2xl'>
					<span className='font-semibold'>404</span>, page doesn&apos;t exist
				</div>
				<Link href='/' className='text-violet-600 underline'>
					Go home
				</Link>
			</div>
		</div>
	);
}
