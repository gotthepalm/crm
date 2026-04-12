'use client';

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
				return 'bg-blue-100 dark:bg-blue-200 text-blue-700 dark:text-blue-900';
			case 'SCREENING':
				return 'bg-teal-100 dark:bg-teal-200 text-teal-700 dark:text-teal-900';
			case 'OFFER':
				return 'bg-yellow-100 dark:bg-yellow-200 text-yellow-700 dark:text-yellow-900';
			case 'INTERVIEW':
				return 'bg-lime-100 dark:bg-lime-200 text-lime-700 dark:text-lime-900';
			case 'TECH_INTERVIEW':
				return 'bg-lime-100 dark:bg-lime-200 text-lime-700 dark:text-lime-900';
			case 'HIRED':
				return 'bg-green-100 dark:bg-green-200 text-green-700 dark:text-green-900';
			case 'REJECTED':
				return 'bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-900';
		}
	}

	useEffect(() => {
		getCandidate(candidateId).then((c) => setCandidate(c));
	}, [candidateId]);
	return (
		<>
			{candidate && (
				<article
					className='w-full bg-white dark:bg-zinc-900 rounded-2xl
			 	p-5 flex flex-col text-zinc-500 dark:text-zinc-400 text-[16px] font-medium'
				>
					{/*Header*/}
					<div className='flex items-start text-black dark:text-white flex-col gap-2 border-b border-zinc-300 dark:border-zinc-700 mb-3 pb-3'>
						<div className='flex items-center justify-between w-full'>
							<h3 className='text-2xl font-semibold'>{candidate.name}</h3>
							<span
								className={`text-black  text-sm font-medium px-3 py-1 rounded-full ${handleStatus()}`}
							>
								{t(`Status.${candidate.status}`)}
							</span>
						</div>
						{candidate?.vacancy?.position ? (
							<div
								className='cursor-pointer inline-flex items-center component-transition gap-2 border border-violet-300 dark:border-violet-600
								 bg-violet-100 dark:bg-violet-950 font-medium px-4 py-1 rounded-xl'
							>
								<div
									className={`h-6 w-6 mask-[url(/images/vacancy.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
								></div>
								{candidate.vacancy.position}
							</div>
						) : (
							candidate.position && (
								<div className='inline-flex items-center gap-2 font-medium bg-violet-100 dark:bg-violet-700 px-4 py-1 rounded-xl'>
									{candidate.position}
								</div>
							)
						)}
					</div>
					{candidate.meetings.length !== 0 && (
						<div className='flex flex-col items-start text-black dark:text-white gap-2 border-b border-zinc-300 dark:border-zinc-700 mb-3 pb-3'>
							{candidate.meetings.map((meeting) => (
								<div
									className='inline-flex items-center component-transition gap-2 border border-blue-300 dark:border-blue-500
								 bg-blue-100 dark:bg-blue-950 font-medium px-4 py-1 rounded-xl'
									key={meeting.id}
								>
									<div
										className={`h-6 w-6 mask-[url(/images/adaptive-audio-mic.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
									></div>
									<span className='font-semibold'>{meeting.time}</span>|&nbsp;{meeting.date}
									<span className='text-zinc-600 dark:text-zinc-400 text-sm font-semibold'>
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
						<div className='flex justify-between mb-3 pb-3 border-b border-zinc-300 dark:border-zinc-700'>
							<div className='flex flex-col gap-2'>
								{candidate.age && (
									<div className='flex items-center gap-2'>
										<div
											className={`h-6 w-6 mask-[url(/images/age.svg)] mask-center mask-contain mask-no-repeat bg-zinc-600 dark:bg-white`}
										></div>
										{candidate.age} {t('Years')}
									</div>
								)}

								{candidate.email && (
									<div className='flex items-center gap-2'>
										<div
											className={`h-6 w-6 mask-[url(/images/email.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
										></div>
										{candidate.email}
									</div>
								)}

								{candidate.phone && (
									<div className='flex items-center gap-2'>
										<div
											className={`h-6 w-6 mask-[url(/images/phone.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
										></div>
										{candidate.phone}
									</div>
								)}

								{candidate.location && (
									<div className='flex items-center gap-2'>
										<div
											className={`h-6 w-6 mask-[url(/images/location.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
										></div>
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
						<div className='flex flex-col mb-3 pb-3 border-b border-zinc-300 dark:border-zinc-700'>
							<span className='font-medium text-black dark:text-white block mb-1'>{t('Skills')}:</span>
							<div className=''>{candidate.skills}</div>
						</div>
					)}

					{/*Experience & salary*/}
					{(candidate.experienceYears ||
						candidate.salaryExpectationTop ||
						candidate.salaryExpectationBottom) && (
						<div className='flex justify-between mb-3 pb-3 border-b border-zinc-300 dark:border-zinc-700'>
							{candidate.experienceYears && (
								<div>
									<span className='font-medium text-black dark:text-white'>{t('Experience')}:</span>{' '}
									{candidate.experienceYears} {t('Years')}
								</div>
							)}

							{(candidate.salaryExpectationBottom || candidate.salaryExpectationTop) && (
								<div>
									<span className='font-medium text-black dark:text-white'>{t('Salary')}:</span>{' '}
									{candidate.salaryExpectationBottom ?? '?'}-{candidate.salaryExpectationTop ?? '?'}$
								</div>
							)}
						</div>
					)}
					{/*Note*/}
					{candidate.note && (
						<div>
							<span className='font-medium text-black dark:text-white block mb-1'>{t('Note')}:</span>
							<div className='text-[14px]'>{candidate.note}</div>
						</div>
					)}
				</article>
			)}
		</>
	);
}
