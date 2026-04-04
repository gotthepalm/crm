'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MeetingModel } from '@/src/generated/prisma/models/Meeting';
import Link from 'next/link';
import EditMeetingForm from '@/src/app/[locale]/crm/meetings/_components/EditMeetingForm';
import { useTranslations } from 'use-intl';

export default function Meeting({ meeting }: { meeting: MeetingModel }) {
	const t = useTranslations('MeetingCard');

	const [openForm, setOpenForm] = useState<boolean>(false);

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
		document.body.style.overflow = openForm ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [meeting.id, openForm]);
	return (
		<>
			{openForm && <EditMeetingForm setOpenForm={setOpenForm} meeting={meeting} />}
			<article className='bg-white flex flex-col gap-3 rounded-2xl overflow-hidden text-[16px] font-medium border border-zinc-300 p-5 w-full h-full max-w-xl break-inside-avoid transition'>
				<div className='flex flex-col gap-3 items-start text-[18px] border-b border-zinc-300 pb-5'>
					<div className='w-full flex justify-between'>
						<span className='flex gap-3 font-medium px-3 py-1 rounded-xl bg-violet-200'>
							<Image src='/images/time.svg' alt='' height={24} width={24} />
							{meeting.time}
						</span>
						<span className='flex gap-3 font-medium px-3 py-1 rounded-xl bg-lime-100'>
							<Image src='/images/calendar.svg' alt='' height={24} width={24} />
							{meeting.date}
						</span>
					</div>
					<span className={`self-end text-[16px] font-medium px-3 py-1 rounded-xl ${handleInterviewType()}`}>
						{t(`InterviewType.${meeting.interviewType}`)}
					</span>
				</div>
				{meeting.note && (
					<div className='mb-3 pb-3 text-zinc-600 border-b border-zinc-300'>
						<span className='font-medium text-black mr-2'>{t('Note')}:</span>
						{meeting.note}
					</div>
				)}
				{meeting.interviewers.length !== 0 && (
					<div className='flex flex-col gap-2'>
						{meeting.interviewers.map((value, index) => (
							<span key={index} className='flex gap-3 font-medium w-fit px-3 py-1 rounded-xl bg-teal-100'>
								<Image src='/images/interviewers.svg' alt='' height={20} width={20} />
								{value}
							</span>
						))}
					</div>
				)}
				<div className='text-[16px] my-4'>
					{meeting.url && (
						<Link
							className='flex items-center justify-center w-full h-15 leading-25 border border-zinc-300 rounded-xl'
							href={meeting.url}
							target={'_blank'}
						>
							{t('GoToMeeting')}
						</Link>
					)}
				</div>
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
