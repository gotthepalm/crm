'use client';

import CrmHeader from '@/src/components/CrmHeader';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';
import { useTranslations } from 'use-intl';
import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ActionState, createMeeting } from '@/src/app/[locale]/crm/meetings/_actions/createMeetingAction';
import { MeetingModel } from '@/src/generated/prisma/models/Meeting';

export default function MeetingsAdd() {
	const t = useTranslations('AddMeeting');
	const router = useRouter();
	const [state, action] = useActionState<ActionState | null, FormData>(async (_prev, formData) => {
		const state = await createMeeting(formData);
		if (state.result === 'success') {
			router.push('/crm/meetings');
		}
		return state;
	}, null);


	const isValidationError = state?.result === 'validation-error';

	function getValue(name: keyof MeetingModel) {
		if (state?.result !== 'validation-error') return undefined;

		const v = state.values[name];

		if (v === undefined || v === null) return undefined;

		return v.toString();
	}

	function getInterviewerValue(index: number): string | undefined {
		if (state?.result !== 'validation-error') return undefined;

		const v = state.values.interviewers;

		if (!Array.isArray(v)) return undefined;

		const value = v[index];
		return value !== undefined ? value.toString() : undefined;
	}

	const [interviewers, setInterviewers] = useState([0]);

	const addInterviewer = () => {
		setInterviewers([...interviewers, interviewers.length]);
	};

	const deleteInterviewer = (id: number) => {
		setInterviewers((prev) => prev.filter((i) => i !== id));
	};

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
							href={'/crm/meetings'}
							className='cursor-pointer hover:bg-zinc-100 transition-colors duration-200 px-6
						py-2 rounded-2xl text-lg flex items-center font-medium border border-zinc-300 gap-2'
						>
							{t('Cancel')}
						</Link>
						<LanguageSwitcher />
					</div>
				</div>
			</CrmHeader>
			<main className='bg-white h-full'>
				<div className='w-full max-w-[1500px] mx-auto pt-20'>
					<div className='w-full py-12 px-32'>
						<h2 className='text-3xl font-medium text-center pb-5 border-b border-zinc-300'>
							{t('FormTitle')}
						</h2>
						<form action={action} className='flex flex-col gap-3.5 mt-10 w-full'>
							<div className='grid grid-cols-2 justify-between gap-8 mb-5'>
								<div className='flex flex-col justify-baseline items-baseline gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Date')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='date'
											name='date'
											defaultValue={getValue('date')}
										/>
									</div>
									{isValidationError &&
										state.errors.date &&
											<div className='text-[14px] h-[14px] text-red-500 mt-2'>
												{state.errors.date}
											</div>
										}
								</div>
								<div className='flex flex-col justify-baseline items-baseline gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Time')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='time'
											name='time'
											defaultValue={getValue('time')}
										/>
									</div>
									{isValidationError &&
										state.errors.time &&
										<div className='text-[14px] h-[14px] text-red-500 mt-2'>
											{state.errors.time}
										</div>
									}
								</div>
								<div className='flex flex-col justify-baseline items-baseline gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Link')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='url'
											name='url'
											defaultValue={getValue('url')}
										/>
									</div>
									{isValidationError &&
										state.errors.url &&
										<div className='text-[14px] h-[14px] text-red-500 mt-2'>
											{state.errors.url}
										</div>
									}
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										Interview:
										<select
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											name='interviewType'
											key={getValue('interviewType')}
											defaultValue={getValue('interviewType')}
										>
											<option value='HR'>{t('InterviewType.HR')}</option>
											<option value='TECH'>{t('InterviewType.TECH')}</option>
											<option value='LIVE_CODING'>{t('InterviewType.LIVE_CODING')}</option>
											<option value='SYSTEM_DESIGN'>{t('InterviewType.SYSTEM_DESIGN')}</option>
											<option value='BEHAVIORAL'>{t('InterviewType.BEHAVIORAL')}</option>
											<option value='FINAL'>{t('InterviewType.FINAL')}</option>
											<option value='OTHER'>{t('InterviewType.OTHER')}</option>
										</select>
									</div>
									{isValidationError &&
										state.errors.interviewType &&
										<div className='text-[14px] h-[14px] text-red-500 mt-2'>
											{state.errors.interviewType}
										</div>
									}
								</div>
								<div className='w-full flex flex-col items-start justify-between text-zinc-600 col-span-full'>
									{t('Note')}:
									<textarea
										className='cursor-pointer w-full h-28 mt-2 focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										name='note'
										defaultValue={getValue('note')}
									/>
								</div>
								<div className='flex flex-col justify-baseline items-baseline gap-2'>
									<div className='text-zinc-600'>
										{t('Interviewers')}:
										<li className='list-none flex flex-col gap-2 my-5'>
											{interviewers.map((interviewerId) => (
												<div className='flex gap-3' key={interviewerId}>
													<div className='max-w-85 w-full'>
														<input
															className='cursor-pointer focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 mb-2 rounded-xl text-[18px] flex items-center border border-zinc-300'
															type='text'
															name='interviewers'
															defaultValue={getInterviewerValue(interviewerId)}
														/>
														{isValidationError &&
															state.errors.interviewers?.[interviewerId] &&
																<div className='text-[14px] h-[14px] text-red-500 my-2'>
																	{state.errors.interviewers?.[interviewerId]}
																</div>
															}
													</div>
													<button
														className=''
														onClick={() => deleteInterviewer(interviewerId)}
													>
														<Image
															src='/images/close.svg'
															alt='Delete input'
															height={24}
															width={24}
														/>
													</button>
												</div>
											))}
										</li>
									</div>
									<button
										type='button'
										className='cursor-pointer px-10 py-2 rounded-xl text-[16px] flex items-center border border-zinc-300 bg-purple-700 text-white hover:bg-white hover:text-black component-transition'
										onClick={addInterviewer}
									>
										{t('AddInterviewer')}
									</button>
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
