'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';
import EditVacancyForm from '@/src/app/[locale]/crm/vacancies/_components/EditVacancyForm';
import { Prisma } from '@/src/generated/prisma/client';
import FullCandidate from '@/src/app/[locale]/crm/_components/FullCandidate';
import FullMeeting from '@/src/app/[locale]/crm/_components/FullMeeting';

export default function Vacancy({
	vacancy,
}: {
	vacancy: Prisma.VacancyGetPayload<{
		include: {
			candidates: { select: { id: true; name: true } };
			meetings: {
				select: {
					id: true;
					time: true;
					date: true;
					interviewType: true;
				};
			};
		};
	}>;
}) {
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [openCandidate, setOpenCandidate] = useState<false | number>(false);
	const [openMeeting, setOpenMeeting] = useState<false | number>(false);

	const t = useTranslations('VacancyCard');
	function handleStatus() {
		switch (vacancy.status) {
			case 'OPEN':
				return 'bg-green-100 dark:bg-green-200 text-green-700 dark:text-green-900';
			case 'IN_PROGRESS':
				return 'bg-cyan-100 dark:bg-cyan-200 text-cyan-700 dark:text-cyan-900';
			case 'PAUSED':
				return 'bg-yellow-100 dark:bg-yellow-200 text-yellow-700 dark:text-yellow-900';
			case 'CLOSED':
				return 'bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-900';
		}
	}

	useEffect(() => {
		document.body.style.overflow = openForm || openCandidate || openMeeting ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [vacancy.id, openForm, openCandidate, openMeeting]);
	return (
		<>
			{openForm && <EditVacancyForm setOpenForm={setOpenForm} vacancy={vacancy} />}
			{openCandidate !== false && (
				<div
					onClick={() => setOpenCandidate(false)}
					className='backdrop-blur-sm bg-black/50 dark:bg-black/75 fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center'
				>
					<div onClick={(e) => e.stopPropagation()} className='max-w-200 w-full mx-auto px-5'>
						<FullCandidate candidateId={openCandidate} />
					</div>
				</div>
			)}
			{openMeeting !== false && (
				<div
					onClick={() => setOpenMeeting(false)}
					className='backdrop-blur-sm bg-black/50 dark:bg-black/75 fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center'
				>
					<div onClick={(e) => e.stopPropagation()} className='max-w-200 w-full mx-auto px-5'>
						<FullMeeting meetingId={openMeeting} />
					</div>
				</div>
			)}
			<article
				className='bg-white dark:bg-zinc-900 flex flex-col rounded-2xl overflow-hidden text-[16px] font-medium border border-zinc-300 dark:border-zinc-700
			 p-5 w-full h-full max-w-xl break-inside-avoid transition'
			>
				<div className='flex justify-between items-start mb-5'>
					<div className='space-y-2'>
						<h3 className='text-[24px] font-semibold'>{vacancy.position}</h3>
						{vacancy.employmentType && (
							<div className='inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-950 font-medium px-4 py-1 rounded-xl'>
								<div
									className={`h-6 w-6 mask-[url(/images/employment.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
								></div>
								{t(`employmentType.${vacancy.employmentType}`)}
							</div>
						)}
					</div>

					<span className={`text-sm font-medium px-3 py-1 rounded-full ${handleStatus()}`}>
						{t(`status.${vacancy.status}`)}
					</span>
				</div>
				{vacancy.description && (
					<p className='text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-300 dark:border-zinc-700 pt-3 mb-3'>
						{vacancy.description}
					</p>
				)}
				<div className='space-y-2 text-[16px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-300 dark:border-zinc-700 pt-3 mb-3'>
					{vacancy.location && (
						<div className='flex gap-2 mb-3 pb-3 border-b border-zinc-300 dark:border-zinc-700'>
							<div
								className={`h-6 w-6 mask-[url(/images/location.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
							></div>
							{vacancy.location}
						</div>
					)}
					{(vacancy.experienceYears || vacancy.salaryFrom || vacancy.salaryTo) && (
						<div className='flex justify-between'>
							{vacancy.experienceYears && (
								<div>
									<span className='font-medium text-black dark:text-white'>{t('Experience')}:</span>{' '}
									{vacancy.experienceYears} {t('Years')}
								</div>
							)}

							{(vacancy.salaryFrom || vacancy.salaryTo) && (
								<div>
									<span className='font-medium text-black dark:text-white'>{t('Salary')}:</span>{' '}
									{vacancy.salaryFrom ?? '?'}-{vacancy.salaryTo ?? '?'}$
								</div>
							)}
						</div>
					)}
				</div>
				{vacancy.candidates.length !== 0 && (
					<div className='flex flex-col items-start gap-2 mt-3 pt-3 border-t border-zinc-300 dark:border-zinc-700'>
						{vacancy.candidates.map((candidate, index) => (
							<button
								onClick={() => setOpenCandidate(candidate.id)}
								key={index}
								className='flex gap-3 font-medium px-3 py-1 rounded-xl border border-violet-300 dark:border-violet-600
								 bg-violet-100 dark:bg-violet-950 hover:bg-violet-200 dark:hover:bg-violet-900 component-transition cursor-pointer'
							>
								<div
									className={`h-6 w-6 mask-[url(/images/emoji-people.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
								></div>
								{candidate.name}
							</button>
						))}
					</div>
				)}
				{vacancy.meetings.length !== 0 && (
					<div className='flex flex-col items-start gap-2 mt-3 pt-3 border-t border-zinc-300 dark:border-zinc-700'>
						{vacancy.meetings.map((meeting) => (
							<button
								onClick={() => setOpenMeeting(meeting.id)}
								className='cursor-pointer inline-flex items-center component-transition gap-2 border border-blue-300 dark:border-blue-500
								 bg-blue-100 dark:bg-blue-950 hover:bg-blue-200 dark:hover:bg-blue-900 font-medium px-4 py-1 rounded-xl'
								key={meeting.id}
							>
								<div
									className={`h-6 w-6 mask-[url(/images/adaptive-audio-mic.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
								></div>
								<span className='font-semibold'>{meeting.time}</span>|&nbsp;{meeting.date}
								<span className='text-zinc-600 dark:text-zinc-400 text-sm font-semibold'>
									| {t(`InterviewType.${meeting.interviewType}`)}
								</span>
							</button>
						))}
					</div>
				)}
				<div className='flex justify-end gap-2 mt-auto'>
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
