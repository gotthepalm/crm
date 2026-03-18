'use client';

import CrmHeader from '@/src/components/CrmHeader';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';
import { useTranslations } from 'use-intl';
import { ActionState, createVacancy } from '@/src/app/[locale]/crm/vacancies/_actons/createVacancyAction';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

export default function VacanciesAdd() {
	const t = useTranslations('AddVacancy');
	const router = useRouter();
	
	const [state, action] = useActionState<ActionState | null, FormData>(async (_prev, formData) => {
		const state = await createVacancy(formData);
		if (state.result === 'success') {
			router.push('/crm/vacancies');
		}
		return state;
	}, null)
	
	return (
		<>
			<CrmHeader>
				<div className='w-full h-full px-10 flex items-center justify-between'>
					<Link href='/' className='flex items-center gap-2'>
						<Image src={'/images/bloom-icon.svg'} height={40} width={40} alt='bloom icon' />
					</Link>
					<div className='flex items-center gap-8'>
						<label
							htmlFor='submitButton'
							className='cursor-pointer bg-violet-700 text-white hover:bg-violet-800 transition-colors duration-200 px-6
						py-2 rounded-2xl text-lg flex items-center font-medium border gap-2'
						>
							{t('Create')}
						</label>
						<Link
							href={'/crm/vacancies'}
							className='cursor-pointer hover:bg-zinc-100 transition-colors duration-200 px-6
						py-2 rounded-2xl text-lg flex items-center font-medium border border-zinc-300 gap-2'
						>
							{t('Cancel')}
						</Link>
						<LanguageSwitcher />
					</div>
				</div>
			</CrmHeader>
			<main className='bg-white'>
				<div className='w-full max-w-[1500px] mx-auto pt-20'>
					<div className='w-full py-12 px-32'>
						<h2 className='text-3xl font-medium text-center pb-5 border-b border-zinc-300'>
							{t('FormTitle')}
						</h2>
						<form action={action} className='flex flex-col gap-3.5 mt-10 w-full'>
							<div className='grid grid-cols-2 justify-between gap-8 mb-5'>
								<div className='flex gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Position')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='text'
											name='position'
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>

									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Location')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='text'
											name='location'
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>

									</div>
								</div>
								<div className='w-full flex flex-col items-start justify-between text-zinc-600 col-span-full'>
									{t('Description')}:
									<textarea
										className='cursor-pointer w-full h-28 mt-2 focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										name='description'
									/>
								</div>
								<div className='text-zinc-600 col-span-full'>
									{t('Salary')}:
									<div className='grid grid-cols-2 gap-8 w-full'>
										<div className='flex flex-col gap-2'>
											<div className='flex w-full items-center justify-between text-zinc-600'>
												{t('From')}:
												<div className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
													<input
														className='w-full text-black'
														type='number'
														name='salaryFrom'
													/>
													$
												</div>
											</div>
											<div className='text-[14px] h-[14px] text-red-500'>
											</div>
										</div>
										<div className='flex flex-col gap-2'>
											<div className='flex w-full items-center justify-between text-zinc-600'>
												{t('To')}:
												<div className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
													<input
														className='w-full text-black'
														type='number'
														name='salaryTo'
													/>
													$
												</div>
											</div>
											<div className='text-[14px] h-[14px] text-red-500'>
											</div>
										</div>
									</div>
								</div>
								<div className='flex flex-col gap-2 col-span-full'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Experience')}:
										<div className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
											<input
												className='w-10 text-black'
												type='number'
												name='experienceYears'
											/>
											{t('Years')}
										</div>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('VacancyStatus')}:
										<select
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											name='status'
										>
											<option value='OPEN'>{t('Option.OPEN')}</option>
											<option value='IN_PROGRESS'>{t('Option.IN_PROGRESS')}</option>
											<option value='PAUSED'>{t('Option.PAUSED')}</option>
											<option value='CLOSED'>{t('Option.CLOSED')}</option>
										</select>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('EmploymentType')}:
										<select
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											name='employmentType'
										>
											<option value='FULL_TIME'>{t('Option.FULL_TIME')}</option>
											<option value='PART_TIME'>{t('Option.PART_TIME')}</option>
											<option value='CONTRACT'>{t('Option.CONTRACT')}</option>
											<option value='INTERNSHIP'>{t('Option.INTERNSHIP')}</option>
										</select>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Candidates')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='text'
											name='candidates'
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Meetings')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='text'
											name='meetings'
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
									</div>
								</div>
							</div>
							<button type='submit' id='submitButton' hidden={true}></button>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
