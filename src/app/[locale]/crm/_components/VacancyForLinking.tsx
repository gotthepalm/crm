'use client';

import Image from 'next/image';
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
				return 'bg-green-100 text-green-700 border-green-400';
			case 'IN_PROGRESS':
				return 'bg-blue-100 text-blue-700 border-blue-400';
			case 'PAUSED':
				return 'bg-lime-100 text-lime-700 border-lime-400';
			case 'CLOSED':
				return 'bg-red-100 text-red-700 border-red-400';
		}
	}
	return (
		<div
			onClick={() => setVacancyInput((prev) => (prev === vacancy.id.toString() ? '' : vacancy.id.toString()))}
			className={`${vacancyInput === vacancy.id.toString() ? 'bg-violet-100 border-violet-300' : 'bg-white border-zinc-300'}
			 flex flex-col rounded-2xl overflow-hidden text-[16px] font-medium border p-5 w-full h-full max-w-xl component-transition cursor-pointer`}
		>
			<div className='flex justify-between items-start mb-5'>
				<div className='space-y-2'>
					<h3 className='text-[24px] font-semibold'>{vacancy.position}</h3>
					{vacancy.employmentType && (
						<div
							className={`${vacancyInput === vacancy.id.toString() ? 'bg-blue-200' : 'bg-blue-100'} inline-flex
							 items-center component-transition gap-2 font-medium px-4 py-1 rounded-xl`}
						>
							<Image src='/images/employment.svg' width={22} height={22} alt='' />
							{t(`employmentType.${vacancy.employmentType}`)}
						</div>
					)}
				</div>

				<span className={`text-sm font-medium px-3 py-1 rounded-full ${handleStatus()}`}>
					{t(`status.${vacancy.status}`)}
				</span>
			</div>
			{vacancy.description && (
				<p className='text-sm text-gray-600 border-t border-zinc-300 pt-3 mb-3'>{vacancy.description}</p>
			)}
			<div className='space-y-2 text-[16px] text-gray-700'>
				{vacancy.location && (
					<p className='flex gap-2 mb-3 pb-3 border-b border-zinc-300'>
						<Image src='/images/location.svg' width={25} height={25} alt='' />
						{vacancy.location}
					</p>
				)}
				{(vacancy.experienceYears || vacancy.salaryFrom || vacancy.salaryTo) && (
					<div className='flex justify-between'>
						{vacancy.experienceYears && (
							<div>
								<span className='font-medium text-black'>{t('Experience')}:</span>{' '}
								{vacancy.experienceYears} {t('Years')}
							</div>
						)}

						{(vacancy.salaryFrom || vacancy.salaryTo) && (
							<div>
								<span className='font-medium text-black'>{t('Salary')}:</span>{' '}
								{vacancy.salaryFrom ?? '?'}-{vacancy.salaryTo ?? '?'}$
							</div>
						)}
					</div>
				)}
			</div>
			{vacancy.candidates.length !== 0 && (
				<div className='flex flex-col gap-2 mt-3 pt-3 border-t border-zinc-300'>
					{vacancy.candidates.map((candidate, index) => (
						<div
							key={index}
							className={`${vacancyInput === vacancy.id.toString() ? 'bg-violet-200' : 'bg-violet-100'} flex gap-3
							 font-medium px-3 py-1 rounded-xl border border-violet-300 component-transition`}
						>
							<Image src='/images/emoji_people.svg' alt='' height={20} width={20} />
							{candidate.name}
						</div>
					))}
				</div>
			)}
			{vacancy.meetings.length !== 0 && (
				<div className='flex flex-col items-start gap-2 mt-3 pt-3 border-t border-zinc-300'>
					{vacancy.meetings.map((meeting) => (
						<div
							className={`${vacancyInput === vacancy.id.toString() ? 'bg-blue-200' : 'bg-blue-100'}
							 inline-flex items-center gap-2 border border-blue-300 bg-blue-100 font-medium px-4 py-1 rounded-xl component-transition`}
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
		</div>
	);
}
