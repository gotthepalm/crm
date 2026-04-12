'use client';

import { SourceModel } from '@/src/generated/prisma/models/Source';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import EditSourceForm from '@/src/app/[locale]/crm/sources/_components/EditSourceForm';

export default function Source({ source }: { source: SourceModel }) {
	const domain = new URL(source.url).hostname;
	const [openForm, setOpenForm] = useState<boolean>(false);

	useEffect(() => {
		document.body.style.overflow = openForm ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [source.id, openForm]);

	return (
		<>
			{openForm && <EditSourceForm setOpenForm={setOpenForm} source={source} />}
			<article className='relative'>
				<Link
					key={source.id}
					href={source.url}
					target='blank'
					className='flex flex-col items-center gap-3 p-5 font-medium bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-700'
				>
					<img
						src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
						alt=''
						height={50}
						width={50}
					/>
					<h2 className=''>{source.name}</h2>
				</Link>
				<div className='absolute top-5 right-5'>
					<button
						className='p-1 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 component-transition flex items-center justify-center rounded-md'
						onClick={() => setOpenForm(true)}
					>
						<Image src='/images/pencil.svg' width={25} height={25} alt='edit'></Image>
					</button>
				</div>
			</article>
		</>
	);
}
