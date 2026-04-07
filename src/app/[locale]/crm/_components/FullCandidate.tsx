'use client';

import Image from 'next/image';
import { useTranslations } from 'use-intl';
import Link from 'next/link';
import { Prisma } from '@/src/generated/prisma/client';
import { useEffect, useState } from 'react';
import { getCandidate } from '@/src/app/[locale]/crm/_actions/getCandidateAction';

export default function FullCandidate({ candidateId }: { candidateId: number }) {
	const [candidate, setCandidate] = useState<null | Prisma.CandidateGetPayload<{
		include: {
			vacancy: { select: { position: true } };
			meetings: { select: { id: true; time: true; date: true; interviewType: true } };
		};
	}>>();

	const t = useTranslations('CandidateCard');

	function handleStatus() {
		switch (candidate?.status) {
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
		getCandidate(candidateId).then((c) => setCandidate(c));
	}, [candidateId]);
	return (
		<>
			{candidate && (
				<article
					className='w-full bg-white rounded-2xl
			 	p-5 flex flex-col text-zinc-500 text-[16px] font-medium'
				>
					{/*Header*/}
					<div className='flex text-black justify-between items-start mb-3 pb-3 border-b border-zinc-300'>
						<div>
							<h3 className='text-2xl font-semibold mb-2'>{candidate.name}</h3>
							{candidate?.vacancy?.position ? (
								<div
									className='inline-flex items-center component-transition gap-2 border border-violet-300
								 bg-violet-100 font-medium px-4 py-1 rounded-xl'
								>
									<Image src='/images/vacancy.svg' width={22} height={22} alt='' />
									{candidate.vacancy.position}
								</div>
							) : (
								candidate.position && (
									<div className='inline-flex items-center gap-2 font-medium bg-violet-100 px-4 py-1 rounded-xl'>
										{candidate.position}
									</div>
								)
							)}
						</div>
						<span className={`text-black text-sm font-medium px-3 py-1 rounded-full ${handleStatus()}`}>
							{t(`Status.${candidate.status}`)}
						</span>
					</div>
					{candidate.meetings.length !== 0 && (
						<div className='flex flex-col items-start text-black gap-2 border-b border-zinc-300 mb-3 pb-3'>
							{candidate.meetings.map((meeting) => (
								<div
									className='inline-flex items-center gap-2 border border-blue-300
								 bg-blue-100 font-medium px-4 py-1 rounded-xl'
									key={meeting.id}
								>
									<Image src='/images/adaptive_audio_mic.svg' width={22} height={22} alt='' />
									{meeting.time}, {meeting.date}
									<span className='text-zinc-600 text-sm font-semibold'>
										| {t(`InterviewType.${meeting.interviewType}`)}
									</span>
								</div>
							))}
						</div>
					)}
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
					{(candidate.experienceYears ||
						candidate.salaryExpectationTop ||
						candidate.salaryExpectationBottom) && (
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
				</article>
			)}
		</>
	);
}
