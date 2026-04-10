'use client';

import Image from 'next/image';
import { useTranslations } from 'use-intl';
import { Prisma } from '@/src/generated/prisma/client';
import { useEffect, useState } from 'react';
import { getVacancy } from '@/src/app/[locale]/crm/_actions/getVacancyAction';

export default function FullVacancy({ vacancyId }: { vacancyId: number }) {
	const [vacancy, setVacancy] = useState<null | Prisma.VacancyGetPayload<{
		include: {
			candidates: { select: { name: true } };
			meetings: { select: { id: true; time: true; date: true; interviewType: true } };
		};
	}>>();

	const t = useTranslations('VacancyCard');
	function handleStatus() {
		switch (vacancy?.status) {
			case 'OPEN':
				return 'bg-green-100 text-green-700';
			case 'IN_PROGRESS':
				return 'bg-cyan-100 text-cyan-700';
			case 'PAUSED':
				return 'bg-yellow-100 text-yellow-700';
			case 'CLOSED':
				return 'bg-red-100 text-red-700';
		}
	}
	useEffect(() => {
		getVacancy(vacancyId).then((v) => setVacancy(v));
	}, [vacancyId]);
	return (
		<>
			{vacancy && (
				<article className='bg-white flex flex-col rounded-2xl overflow-hidden text-[16px] font-medium p-5 w-full h-full break-inside-avoid transition'>
					<div className=' flex justify-between items-start mb-5'>
						<div className='space-y-2'>
							<h3 className='text-[24px] font-semibold'>{vacancy.position}</h3>
							{vacancy.employmentType && (
								<button className='inline-flex items-center gap-2 bg-blue-100 font-medium px-4 py-1 rounded-xl'>
									<Image src='/images/employment.svg' width={22} height={22} alt='' />
									{t(`employmentType.${vacancy.employmentType}`)}
								</button>
							)}
						</div>

						<span className={`text-sm font-medium px-3 py-1 rounded-full ${handleStatus()}`}>
							{t(`status.${vacancy.status}`)}
						</span>
					</div>
					{vacancy.description && (
						<p className='text-sm text-gray-600 border-t border-zinc-300 pt-3 mb-3'>
							{vacancy.description}
						</p>
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
						<div className='flex flex-col gap-2 mt-3 mb-3 pt-3 border-t border-zinc-300'>
							{vacancy.candidates.map((candidate, index) => (
								<div
									key={index}
									className='flex gap-3 font-medium px-3 py-1 rounded-xl border border-violet-300
								 bg-violet-100 w-fit'
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
									className='cursor-pointer inline-flex items-center component-transition gap-2 border border-blue-300
								 bg-blue-100 hover:bg-blue-200 font-medium px-4 py-1 rounded-xl'
									key={meeting.id}
								>
									<Image src='/images/adaptive_audio_mic.svg' width={22} height={22} alt='' />
									<span className='font-semibold'>{meeting.time}</span>|&nbsp;{meeting.date}
									<span className='text-zinc-600 text-sm font-semibold'>
										| {t(`InterviewType.${meeting.interviewType}`)}
									</span>
								</div>
							))}
						</div>
					)}
				</article>
			)}
		</>
	);
}
