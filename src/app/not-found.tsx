import Link from 'next/link';

export default function NotFound() {
	return (
		
		<div className='p-50 flex items-center justify-center px-6'>
			<section className='max-w-4xl w-full text-center flex flex-col items-center'>
				<div>This page doesn&apos;t exist :(</div>
				<Link className='underline text-purple-900' href='/'>Go home</Link>
			</section>
		</div>
	);
}