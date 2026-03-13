'use client'

import Link from 'next/link';
import { useState } from 'react';

const sources = [
	{
		link: 'https://www.linkedin.com/feed/',
		domain: new URL('https://www.linkedin.com/feed/').hostname,
		title: 'LinkedIn',
	},
	{
		link: 'https://github.com/',
		domain: new URL('https://github.com/').hostname,
		title: 'Github',
	},
	{
		link: 'https://dou.ua/lenta/articles/front-end-developer-interview-questions/',
		domain: new URL('https://dou.ua/lenta/articles/front-end-developer-interview-questions/').hostname,
		title: 'Dou',
	},
];

export default function Sources() {
	const [addSource, setAddSource] = useState<boolean>(false);

	return (
		<div className='w-full'>
			<button
				className='flex justify-center items-center gap-3 bg-white text-[22px] p-3 mb-5 rounded-2xl w-full cursor-pointer'
				onClick={() => setAddSource((prev) => !prev)}
			>
				<span className='material-symbols-rounded'>add_2</span>
				Add candidate
			</button>
			{addSource && (
				<div className='fixed inset-0 flex items-center justify-center bg-black/50'>
					<div className='relative bg-white p-6 rounded-xl shadow-lg'>
						<h1 className='text-3xl text-center font-extrabold uppercase pt-10 mb-5'>Add a new source</h1>

						<form className='flex flex-col gap-3.5 max-w-2xl w-full'>
							<input
								type='text'
								name='sourceLink'
								placeholder='Link on source'
								className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
							/>
							<input
								type='text'
								name='sourceTitle'
								placeholder='Source title'
								className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
							/>
							<button
								type='submit'
								className='uppercase flex items-center justify-center px-3 h-12 leading-12 bg-purple-700 hover:bg-transparent border-2 border-purple-700 text-[14px] font-medium text-white hover:text-purple-700 rounded-2xl component-transition'
							>
								Add a new source
							</button>
						</form>

						<button
							className='material-symbols-rounded absolute top-5 right-5 p-2 bg-gray-200 rounded cursor-pointer'
							onClick={() => setAddSource(false)}
						>
							close
						</button>
					</div>
				</div>
			)}
			<li className={`w-max ${sources.length !== 0 ? 'grid grid-cols-3 gap-5' : 'flex justify-center'}`}>
				{sources.map((source) => (
					<Link key={source.title} href={source.link} target='blank'>
						<article className='flex flex-col items-center gap-5 w-50 p-5 bg-white rounded-2xl'>
							<img
								src={`https://www.google.com/s2/favicons?domain=${source.domain}&sz=64`}
								alt=''
								height={50}
								width={50}
							/>
							<h2>{source.title}</h2>
						</article>
					</Link>
				))}
			</li>
		</div>
	);
}
