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
				return 'bg-amber-200 text-amber-800';
			case 'TECH':
				return 'bg-teal-100 text-teal-700';
			case 'LIVE_CODING':
				return 'bg-yellow-100 text-yellow-700';
			case 'SYSTEM_DESIGN':
				return 'bg-cyan-100 text-cyan-700';
			case 'BEHAVIORAL':
				return 'bg-red-100 text-red-700';
			case 'FINAL':
				return 'bg-green-100 text-green-700';
			case 'OTHER':
				return 'bg-mauve-100 text-mauve-700';
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
					className='backdrop-blur-sm bg-black/50 fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center'
				>
					<div onClick={(e) => e.stopPropagation()} className='max-w-200 w-full mx-auto px-5'>
						<FullVacancy vacancyId={meeting.vacancy.id} />
					</div>
				</div>
			)}
			{openCandidate && meeting.candidate && (
				<div
					onClick={() => setOpenCandidate(false)}
					className='backdrop-blur-sm bg-black/50 fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center'
				>
					<div onClick={(e) => e.stopPropagation()} className='max-w-200 w-full mx-auto px-5'>
						<FullCandidate candidateId={meeting.candidate.id} />
					</div>
				</div>
			)}
			<article className='bg-white flex flex-col gap-3 rounded-2xl overflow-hidden text-[16px] font-medium border border-zinc-300 p-5 w-full h-full max-w-xl break-inside-avoid transition'>
				<div className='flex justify-between items-center text-[18px] border-b border-zinc-300 pb-5'>
					<div className='inline-flex items-center border border-blue-300 bg-blue-100 font-medium px-4 py-1 rounded-xl component-transition'>
						<span className='font-semibold'>{meeting.time}</span>&nbsp;|&nbsp;{meeting.date}
					</div>
					<div className={`text-[16px] font-medium px-3 py-1 rounded-xl ${handleInterviewType()}`}>
						{t(`InterviewType.${meeting.interviewType}`)}
					</div>
				</div>

				{/*Interviewers*/}
				{meeting.interviewers.length !== 0 && (
					<div className='flex flex-col gap-2 pb-3 border-b border-zinc-300'>
						<div className='text-zinc-600'>{t('Interviewers')}:</div>
						{meeting.interviewers.map((value, index) => (
							<span
								key={index}
								className='flex gap-3 font-medium w-fit px-3 py-1 rounded-xl border border-zinc-300'
							>
								<Image src='/images/interviewers.svg' alt='' height={20} width={20} />
								{value}
							</span>
						))}
					</div>
				)}

				{/*Interviewing*/}
				{(meeting.candidate?.name || meeting.vacancy?.position) && (
					<div className='flex flex-col items-start gap-2 pb-3 border-b border-zinc-300'>
						<div className='text-zinc-600'>{t('InterviewFor')}:</div>
						<div className='flex items-center justify-between w-full'>
							{meeting.candidate?.name && (
								<button
									onClick={() => setOpenCandidate(true)}
									className='cursor-pointer inline-flex items-center component-transition gap-2 border border-violet-300
								 bg-violet-100 hover:bg-violet-200 font-medium px-4 py-1 rounded-xl'
								>
									<Image src='/images/vacancy.svg' width={22} height={22} alt='' />
									{meeting.candidate.name}
								</button>
							)}
							{meeting.vacancy?.position && (
								<button
									onClick={() => setOpenVacancy(true)}
									className='cursor-pointer inline-flex items-center component-transition gap-2 border border-violet-300
								 bg-violet-100 hover:bg-violet-200 font-medium px-4 py-1 rounded-xl'
								>
									<Image src='/images/vacancy.svg' width={22} height={22} alt='' />
									{meeting.vacancy.position}
								</button>
							)}
						</div>
					</div>
				)}

				{/*Note*/}
				{meeting.note && (
					<div className='flex flex-col gap-2 pb-3 text-zinc-600'>
						<span className='font-medium text-black mr-2'>{t('Note')}:</span>
						<div className='text-[14px]'>{meeting.note}</div>
					</div>
				)}

				{/*Url*/}
				{meeting.url && (
					<Link
						className='flex items-center justify-center hover:bg-zinc-100 component-transition w-full py-3 border border-zinc-300 rounded-2xl'
						href={meeting.url}
						target={'_blank'}
					>
						{t('GoToMeeting')}
					</Link>
				)}
				<div className='flex justify-end mt-auto'>
					<button
						className='p-1 cursor-pointer hover:bg-zinc-100 flex items-center justify-center rounded-md'
						onClick={() => setOpenForm(true)}
					>
						<Image src='/images/pencil.svg' width={25} height={25} alt='edit'></Image>
					</button>
				</div>
			</article>
		</>
	);
}
