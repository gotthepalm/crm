'use client';

import { useTranslations } from 'use-intl';
import { Dispatch, SetStateAction } from 'react';
import { Prisma } from '@/src/generated/prisma/client';

export default function VacancyForLinking({
	vacancy,
	vacancyInput,
	setVacancyInput,
}: {
	vacancy: Prisma.VacancyGetPayload<{
		include: {
			candidates: {
				select: {
					name: true;
				};
			};
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
	vacancyInput: string;
	setVacancyInput: Dispatch<SetStateAction<string>>;
}) {
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
	return (
		<div
			onClick={() => setVacancyInput((prev) => (prev === vacancy.id.toString() ? '' : vacancy.id.toString()))}
			className={`${vacancyInput === vacancy.id.toString() ? 'bg-violet-100 dark:bg-zinc-800' : 'bg-white dark:bg-zinc-900'}
			 border-zinc-300 dark:border-zinc-700 flex flex-col rounded-2xl overflow-hidden text-[16px] font-medium border p-5 w-full h-full max-w-xl component-transition cursor-pointer`}
		>
			<div className='flex justify-between items-start mb-5'>
				<div className='space-y-2'>
					<h3 className='text-[24px] font-semibold'>{vacancy.position}</h3>
					{vacancy.employmentType && (
						<div
							className={`${vacancyInput === vacancy.id.toString() ? 'bg-blue-200 dark:bg-blue-900' : 'bg-blue-100 dark:bg-blue-950'} inline-flex
							 items-center component-transition gap-2 font-medium px-4 py-1 rounded-xl`}
						>
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
			<div className='space-y-2 text-[16px] text-zinc-500 dark:text-zinc-400'>
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
				<div className='flex flex-col gap-2 mt-3 pt-3 border-t border-zinc-300 dark:border-zinc-700'>
					{vacancy.candidates.map((candidate, index) => (
						<div
							key={index}
							className={`${vacancyInput === vacancy.id.toString() ? 'bg-violet-200 dark:bg-violet-900' : 'bg-violet-100 dark:bg-violet-950'} flex gap-3
							 font-medium px-3 py-1 rounded-xl border border-violet-300 dark:border-violet-600 component-transition`}
						>
							<div
								className={`h-6 w-6 mask-[url(/images/emoji-people.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
							></div>
							{candidate.name}
						</div>
					))}
				</div>
			)}
			{vacancy.meetings.length !== 0 && (
				<div className='flex flex-col items-start gap-2 mt-3 pt-3 border-t border-zinc-300 dark:border-zinc-700'>
					{vacancy.meetings.map((meeting) => (
						<div
							className={`${vacancyInput === vacancy.id.toString() ? 'bg-blue-200 dark:bg-blue-900' : 'bg-blue-100 dark:bg-blue-950'}
							 inline-flex items-center gap-2 border border-blue-300 dark:border-blue-500 font-medium px-4 py-1 rounded-xl component-transition`}
							key={meeting.id}
						>
							<div
								className={`h-6 w-6 mask-[url(/images/adaptive-audio-mic.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
							></div>
							{meeting.time}, {meeting.date}
							<span className='text-zinc-600 dark:text-zinc-400 text-sm font-semibold'>
								| {t(`InterviewType.${meeting.interviewType}`)}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
