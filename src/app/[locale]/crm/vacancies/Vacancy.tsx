'use client';

import { VacancyModel } from '@/src/generated/prisma/models/Vacancy';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'use-intl';
import EditVacancyForm from '@/src/app/[locale]/crm/vacancies/EditVacancyForm';

export default function Vacancy({ vacancy }: { vacancy: VacancyModel }) {
	const [openForm, setOpenForm] = useState<boolean>(false);
	const t = useTranslations('VacancyCard');
	function handleStatus() {
		switch (vacancy.status) {
			case 'OPEN':
				return 'bg-green-100 text-green-700';
			case 'IN_PROGRESS':
				return 'bg-blue-100 text-blue-700';
			case 'PAUSED':
				return 'bg-lime-100 text-lime-700';
			case 'CLOSED':
				return 'bg-red-100 text-red-700';
		}
	}
	return (
		<>
			{openForm && <EditVacancyForm setOpenForm={setOpenForm} vacancy={vacancy} />}
			<article className='bg-white flex flex-col rounded-2xl overflow-hidden border border-zinc-300 p-5 w-full h-full max-w-xl break-inside-avoid transition'>
				<div className='flex justify-between items-start mb-5'>
					<div className='space-y-2'>
						<h3 className='text-[24px] font-semibold'>{vacancy.position}</h3>
						{vacancy.employmentType && (
							<p className='text-[16px] text-black'>{t(`employmentType.${vacancy.employmentType}`)}</p>
						)}
					</div>

					<span className={`text-sm font-medium px-3 py-1 rounded-full ${handleStatus()}`}>
						{/*{t(`Status.${vacancy.status}`)}*/}
						{t(`status.${vacancy.status}`)}
					</span>
				</div>
				{vacancy.description && (
					<p className='text-sm text-gray-600 border-t pt-3 mb-3'>{vacancy.description}</p>
				)}
				<div className='mt-auto space-y-2 text-[16px] text-gray-700 mb-4'>
					{vacancy.location && (
						<p className='flex gap-2'>
							<Image src='/images/location.svg' width={25} height={25} alt='' />
							{vacancy.location}
						</p>
					)}
					{(vacancy.salaryFrom || vacancy.salaryTo) && (
						<p className='flex gap-2'>
							<Image src='/images/dollar.svg' width={25} height={25} alt='' />
							{vacancy.salaryFrom ?? '?'}
							{' - '}
							{vacancy.salaryTo ?? '?'}
						</p>
					)}
					{vacancy.experienceYears && (
						<p className='flex gap-2'>
							<Image src='/images/experience.svg' width={25} height={25} alt='' />
							{vacancy.experienceYears} years
						</p>
					)}
				</div>
				<div className='flex justify-end gap-2 mt-auto'>
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
