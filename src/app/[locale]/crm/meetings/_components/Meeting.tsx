'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import EditMeetingForm from '@/src/app/[locale]/crm/meetings/_components/EditMeetingForm';
import { useTranslations } from 'use-intl';
import { Prisma } from '@/src/generated/prisma/client';
import FullVacancy from '@/src/app/[locale]/crm/_components/FullVacancy';
import FullCandidate from '@/src/app/[locale]/crm/_components/FullCandidate';

export default function Meeting({
	meeting,
}: {
	meeting: Prisma.MeetingGetPayload<{
		include: {
			vacancy: {
				select: {
					id: true;
					position: true;
				};
			};
			candidate: {
				select: {
					id: true;
					name: true;
				};
			};
		};
	}>;
}) {
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [openVacancy, setOpenVacancy] = useState<boolean>(false);
	const [openCandidate, setOpenCandidate] = useState<boolean>(false);

	const t = useTranslations('MeetingCard');

	function handleInterviewType() {
		switch (meeting.interviewType) {
			case 'HR':
				return 'bg-amber-100 dark:bg-amber-200 text-amber-700 dark:text-amber-900';
			case 'TECH':
				return 'bg-teal-100 dark:bg-teal-200 text-teal-700 dark:text-teal-900';
			case 'LIVE_CODING':
				return 'bg-yellow-100 dark:bg-yellow-200 text-yellow-700 dark:text-yellow-900';
			case 'SYSTEM_DESIGN':
				return 'bg-cyan-100 dark:bg-cyan-200 text-cyan-700 dark:text-cyan-900';
			case 'BEHAVIORAL':
				return 'bg-red-100 dark:bg-red-200 text-red-700 dark:text-red-900';
			case 'FINAL':
				return 'bg-green-100 dark:bg-green-200 text-green-700 dark:text-green-900';
			case 'OTHER':
				return 'bg-mauve-100 dark:bg-mauve-200 text-mauve-700 dark:text-mauve-900';
		}
	}

	useEffect(() => {
		document.body.style.overflow = openForm || openVacancy || openCandidate ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [meeting.id, openForm, openVacancy, openCandidate]);
	return (
		<>
			{openForm && <EditMeetingForm setOpenForm={setOpenForm} meeting={meeting} />}
			{openVacancy && meeting.vacancy && (
				<div
					onClick={() => setOpenVacancy(false)}
					className='backdrop-blur-sm bg-black/50 dark:bg-black/75 fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center'
				>
					<div onClick={(e) => e.stopPropagation()} className='max-w-200 w-full mx-auto px-5'>
						<FullVacancy vacancyId={meeting.vacancy.id} />
					</div>
				</div>
			)}
			{openCandidate && meeting.candidate && (
				<div
					onClick={() => setOpenCandidate(false)}
					className='backdrop-blur-sm bg-black/50 dark:bg-black/75 fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center'
				>
					<div onClick={(e) => e.stopPropagation()} className='max-w-200 w-full mx-auto px-5'>
						<FullCandidate candidateId={meeting.candidate.id} />
					</div>
				</div>
			)}
			<article
				className='bg-white dark:bg-zinc-900 flex flex-col gap-3 rounded-2xl overflow-hidden text-[16px]
			 font-medium border border-zinc-300 dark:border-zinc-700 p-5 w-full h-full max-w-xl break-inside-avoid transition'
			>
				<div className='flex justify-between items-center text-[18px] border-b border-zinc-300 dark:border-zinc-700 pb-5'>
					<div
						className='inline-flex items-center border border-blue-300 dark:border-blue-500
						bg-blue-100 dark:bg-blue-950 font-medium px-4 py-1 rounded-xl component-transition'
					>
						<span className='font-semibold'>{meeting.time}</span>&nbsp;|&nbsp;{meeting.date}
					</div>
					<div className={`text-[16px] font-medium px-3 py-1 rounded-xl ${handleInterviewType()}`}>
						{t(`InterviewType.${meeting.interviewType}`)}
					</div>
				</div>

				{/*Interviewers*/}
				{meeting.interviewers.length !== 0 && (
					<div className='flex flex-col gap-2 pb-3 border-b border-zinc-300 dark:border-zinc-700'>
						<div className='text-zinc-600 dark:text-white'>{t('Interviewers')}:</div>
						{meeting.interviewers.map((value, index) => (
							<span
								key={index}
								className='flex gap-3 font-medium w-fit px-3 py-1 rounded-xl border border-zinc-300 dark:border-zinc-700'
							>
								<div
									className={`h-6 w-6 mask-[url(/images/interviewers.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
								></div>
								{value}
							</span>
						))}
					</div>
				)}

				{/*Interviewing*/}
				{(meeting.candidate?.name || meeting.vacancy?.position) && (
					<div className='flex flex-col items-start gap-2 pb-3 border-b border-zinc-300 dark:border-zinc-700'>
						<div className='text-zinc-600 dark:text-white'>{t('InterviewFor')}:</div>
						<div className='flex items-center gap-2 w-full'>
							{meeting.candidate?.name && (
								<button
									onClick={() => setOpenCandidate(true)}
									className='cursor-pointer inline-flex items-center gap-2 min-w-0 max-w-full
      								border border-violet-300 dark:border-violet-600
      								bg-violet-100 dark:bg-violet-950 hover:bg-violet-200 dark:hover:bg-violet-900
      								font-medium px-4 py-1 rounded-xl component-transition'
								>
									<div className='h-6 w-6 shrink-0 mask-[url(/images/emoji-people.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white'></div>

									<span className='truncate min-w-0'>{meeting.candidate.name}</span>
								</button>
							)}

							{meeting.vacancy?.position && (
								<button
									onClick={() => setOpenVacancy(true)}
									className='cursor-pointer flex items-center gap-2 min-w-0 max-w-full
      								border border-amber-300 dark:border-amber-600
      								bg-amber-100 dark:bg-amber-950 hover:bg-amber-200 dark:hover:bg-amber-900
      								font-medium px-4 py-1 rounded-xl component-transition'
								>
									<div className='h-6 w-6 shrink-0 mask-[url(/images/vacancy.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white'></div>

									<span className='truncate min-w-0'>{meeting.vacancy.position}</span>
								</button>
							)}
						</div>
					</div>
				)}

				{/*Note*/}
				{meeting.note && (
					<div className='flex flex-col gap-2 pb-3 text-zinc-600 dark:text-zinc-400'>
						<span className='font-medium text-black dark:text-white mr-2'>{t('Note')}:</span>
						<div className='text-[14px]'>{meeting.note}</div>
					</div>
				)}

				{/*Url*/}
				{meeting.url && (
					<Link
						className='flex items-center justify-center hover:bg-zinc-100 component-transition w-full py-3
						 border border-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-800 rounded-2xl'
						href={meeting.url}
						target={'_blank'}
					>
						{t('GoToMeeting')}
					</Link>
				)}
				<div className='flex justify-end mt-auto'>
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
