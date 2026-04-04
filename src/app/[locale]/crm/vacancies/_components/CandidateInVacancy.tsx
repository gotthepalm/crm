'use client';

import Image from 'next/image';
import { useTranslations } from 'use-intl';
import { useEffect, useState } from 'react';
import EditCandidateForm from '@/src/app/[locale]/crm/candidates/_components/EditCandidateForm';
import Link from 'next/link';
import { CandidateModel } from '@/src/generated/prisma/models/Candidate';

export default function CandidateInVacancy({ candidate }: {candidate: CandidateModel}) {
	const [openForm, setOpenForm] = useState<boolean>(false);

	const t = useTranslations('CandidateCard');
	function handleStatus() {
		switch (candidate.status) {
			case 'NEW':
				return 'bg-blue-100 text-blue-700';
			case 'SCREENING':
				return 'bg-teal-100 text-teal-700';
			case 'OFFER':
				return 'bg-yellow-100 text-yellow-700';
			case 'INTERVIEW':
				return 'bg-lime-100 text-lime-700';
			case 'TECH_INTERVIEW':
				return 'bg-lime-100 text-lime-700';
			case 'HIRED':
				return 'bg-green-100 text-green-700';
			case 'REJECTED':
				return 'bg-red-100 text-red-700';
		}
	}

	useEffect(() => {
		document.body.style.overflow = openForm ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [candidate.id, openForm]);
	return (
		<>
			{openForm && <EditCandidateForm setOpenForm={setOpenForm} candidate={candidate} isCandidateModal={true}/>}
			<article
				className='w-full bg-white border border-zinc-300 rounded-2xl
			 	p-5 flex flex-col text-zinc-500 text-[16px] font-medium'
			>
				{/*Header*/}
				<div className='flex text-black justify-between items-start mb-3 pb-3 border-b border-zinc-300'>
					<div>
						<h3 className='text-2xl font-semibold mb-2'>{candidate.name}</h3>
					</div>
					<span className={`text-black text-sm font-medium px-3 py-1 rounded-full ${handleStatus()}`}>
						{t(`Status.${candidate.status}`)}
					</span>
				</div>
				{/*Info & links*/}
				{(candidate.age ||
					candidate.email ||
					candidate.phone ||
					candidate.location ||
					candidate.resumeUrl ||
					candidate.linkedinUrl ||
					candidate.gitHubUrl ||
					candidate.portfolioUrl) && (
					<div className='flex justify-between mb-3 pb-3 border-b border-zinc-300'>
						<div className='flex flex-col gap-2'>
							{candidate.age && (
								<div className='flex items-center gap-2'>
									<Image src='/images/age.svg' width={22} height={22} alt='' />
									{candidate.age} {t('Years')}
								</div>
							)}

							{candidate.email && (
								<div className='flex items-center gap-2'>
									<Image src='/images/email.svg' width={22} height={22} alt='' />
									{candidate.email}
								</div>
							)}

							{candidate.phone && (
								<div className='flex items-center gap-2'>
									<Image src='/images/phone.svg' width={22} height={22} alt='' />
									{candidate.phone}
								</div>
							)}

							{candidate.location && (
								<div className='flex items-center gap-2'>
									<Image src='/images/location.svg' width={22} height={22} alt='' />
									{candidate.location}
								</div>
							)}
						</div>
						<div className='flex flex-col gap-2 pr-8 underline'>
							{candidate.resumeUrl && (
								<Link href={candidate.resumeUrl} className='hover:underline'>
									{t('Resume')}
								</Link>
							)}
							{candidate.linkedinUrl && (
								<Link href={candidate.linkedinUrl} className='hover:underline'>
									LinkedIn
								</Link>
							)}
							{candidate.gitHubUrl && (
								<Link href={candidate.gitHubUrl} className='hover:underline'>
									GitHub
								</Link>
							)}
							{candidate.portfolioUrl && (
								<Link href={candidate.portfolioUrl} className='hover:underline'>
									{t('Portfolio')}
								</Link>
							)}
						</div>
					</div>
				)}
				{/*Skills*/}
				{candidate.skills && (
					<div className='flex flex-col mb-3 pb-3 border-b border-zinc-300'>
						<span className='font-medium text-black block mb-1'>{t('Skills')}:</span>
						<div className=''>{candidate.skills}</div>
					</div>
				)}

				{/*Experience & salary*/}
				{(candidate.experienceYears || candidate.salaryExpectationTop || candidate.salaryExpectationBottom) && (
					<div className='flex justify-between mb-3 pb-3 border-b border-zinc-300'>
						{candidate.experienceYears && (
							<div>
								<span className='font-medium text-black'>{t('Experience')}:</span>{' '}
								{candidate.experienceYears} {t('Years')}
							</div>
						)}

						{(candidate.salaryExpectationBottom || candidate.salaryExpectationTop) && (
							<div>
								<span className='font-medium text-black'>{t('Salary')}:</span>{' '}
								{candidate.salaryExpectationBottom ?? '?'}-{candidate.salaryExpectationTop ?? '?'}$
							</div>
						)}
					</div>
				)}
				{/*Note*/}
				{candidate.note && (
					<div>
						<span className='font-medium text-black block mb-1'>{t('Note')}:</span>
						<div className='text-[14px]'>{candidate.note}</div>
					</div>
				)}
				{/*Edit button*/}
				<div className='flex justify-end mt-auto'>
					<button
						onClick={() => setOpenForm(true)}
						className='cursor-pointer p-1 rounded-md hover:bg-zinc-200 transition'
					>
						<Image src='/images/pencil.svg' width={25} height={25} alt='edit' />
					</button>
				</div>
			</article>
		</>
	);
}
