'use client';

import Image from 'next/image';
import { useTranslations } from 'use-intl';
import { useEffect, useState } from 'react';
import EditCandidateForm from '@/src/app/[locale]/crm/candidates/_components/EditCandidateForm';
import Link from 'next/link';
import { Prisma } from '@/src/generated/prisma/client';
import FullVacancy from '@/src/app/[locale]/crm/_components/FullVacancy';
import FullMeeting from '@/src/app/[locale]/crm/_components/FullMeeting';

export default function Candidate({
	candidate,
}: {
	candidate: Prisma.CandidateGetPayload<{
		include: {
			vacancy: {
				select: {
					id: true;
					position: true;
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
}) {
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [openVacancy, setOpenVacancy] = useState<boolean>(false);
	const [openMeeting, setOpenMeeting] = useState<false | number>(false);
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
		document.body.style.overflow = openForm || openVacancy || openMeeting ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [candidate.id, openForm, openVacancy, openMeeting]);
	return (
		<>
			{openForm && <EditCandidateForm setOpenForm={setOpenForm} candidate={candidate} />}
			{openVacancy && candidate.vacancy && (
				<div
					onClick={() => setOpenVacancy(false)}
					className='backdrop-blur-sm bg-black/50 fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center'
				>
					<div onClick={(e) => e.stopPropagation()} className='max-w-200 w-full mx-auto px-5'>
						<FullVacancy vacancyId={candidate.vacancy.id} />
					</div>
				</div>
			)}
			{openMeeting !== false && (
				<div
					onClick={() => setOpenMeeting(false)}
					className='backdrop-blur-sm bg-black/50 fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center'
				>
					<div onClick={(e) => e.stopPropagation()} className='max-w-200 w-full mx-auto px-5'>
						<FullMeeting meetingId={openMeeting} />
					</div>
				</div>
			)}
			<article
				className='w-full max-w-xl bg-white border border-zinc-300 rounded-2xl
			 	p-5 flex flex-col text-zinc-500 text-[16px] font-medium'
			>
				{/*Header*/}
				<div className='flex items-start text-black flex-col gap-2 border-b border-zinc-300 mb-3 pb-3'>
					<div className='flex items-center justify-between w-full'>
						<h3 className='text-2xl font-semibold'>{candidate.name}</h3>
						<span className={`text-black text-sm font-medium px-3 py-1 rounded-full ${handleStatus()}`}>
							{t(`Status.${candidate.status}`)}
						</span>
					</div>
					{candidate?.vacancy?.position ? (
						<button
							onClick={() => setOpenVacancy(true)}
							className='cursor-pointer inline-flex items-center component-transition gap-2 border border-violet-300
								 bg-violet-100 hover:bg-violet-200 font-medium px-4 py-1 rounded-xl'
						>
							<Image src='/images/vacancy.svg' width={22} height={22} alt='' />
							{candidate.vacancy.position}
						</button>
					) : (
						candidate.position && (
							<div className='inline-flex items-center gap-2 font-medium bg-violet-100 px-4 py-1 rounded-xl'>
								{candidate.position}
							</div>
						)
					)}
				</div>
				{candidate.meetings.length !== 0 && (
					<div className='flex flex-col items-start text-black gap-2 border-b border-zinc-300 mb-3 pb-3'>
						{candidate.meetings.map((meeting) => (
							<button
								onClick={() => setOpenMeeting(meeting.id)}
								className='cursor-pointer inline-flex items-center component-transition gap-2 border border-blue-300
								 bg-blue-100 hover:bg-blue-200 font-medium px-4 py-1 rounded-xl'
								key={meeting.id}
							>
								<Image src='/images/adaptive_audio_mic.svg' width={22} height={22} alt='' />
								<span className='font-semibold'>{meeting.time}</span>|&nbsp;{meeting.date}
								<span className='text-zinc-600 text-sm font-semibold'>
									| {t(`InterviewType.${meeting.interviewType}`)}
								</span>
							</button>
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
