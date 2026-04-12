'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { MeetingModel } from '@/src/generated/prisma/models/Meeting';
import { ActionState, editMeeting } from '@/src/app/[locale]/crm/meetings/_actions/editMeetingAction';
import VacancyForLinking from '@/src/app/[locale]/crm/_components/VacancyForLinking';
import CandidateForLinking from '@/src/app/[locale]/crm/_components/CandidateForLinking';
import { getVacancies } from '@/src/app/[locale]/crm/_actions/getVacanciesAction';
import { getCandidates } from '@/src/app/[locale]/crm/_actions/getCandidatesAction';
import { Prisma } from '@/src/generated/prisma/client';
import { deleteMeeting } from '@/src/app/[locale]/crm/meetings/_actions/deleteMeetingAction';

export default function EditMeetingForm({
	setOpenForm,
	meeting,
}: {
	setOpenForm: Dispatch<SetStateAction<boolean>>;
	meeting: Prisma.MeetingGetPayload<{
		include: {
			vacancy: {
				select: {
					position: true;
				};
			};
			candidate: {
				select: {
					name: true;
				};
			};
		};
	}>;
}) {
	const [vacancies, setVacancies] = useState<
		| Prisma.VacancyGetPayload<{
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
		  }>[]
		| null
	>(null);
	const [candidates, setCandidates] = useState<
		| Prisma.CandidateGetPayload<{
				include: {
					vacancy: {
						select: {
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
		  }>[]
		| null
	>(null);
	const [vacancyInput, setVacancyInput] = useState<string>(meeting.vacancyId ? meeting.vacancyId.toString() : '');
	const [candidateInput, setCandidateInput] = useState<string>(
		meeting.candidateId ? meeting.candidateId.toString() : '',
	);

	const [interviewers, setInterviewers] = useState(() => {
		if (meeting?.interviewers?.length) {
			return meeting.interviewers.map((_, index) => index);
		}
		return [0];
	});

	const t = useTranslations('AddMeeting');
	const router = useRouter();

	const [state, action] = useActionState<ActionState | null, FormData>(async (_prev, formData) => {
		const state = await editMeeting(formData, meeting.id);
		if (state.result === 'success') {
			router.refresh();
			setOpenForm(false);
		}
		return state;
	}, null);

	const addInterviewer = () => {
		setInterviewers([...interviewers, interviewers.length]);
	};
	const deleteInterviewer = (id: number) => {
		setInterviewers((prev) => prev.filter((i) => i !== id));
	};

	function getValue(name: keyof MeetingModel) {
		// If editMeeting aren't returned 'validation-error', get values from meeting prop
		if (state?.result !== 'validation-error') {
			const v = meeting[name];

			if (v === undefined || v === null) return undefined;
			return v.toString();
		}
		// Else, get values from editMeeting
		const v = state.values[name];

		if (v === undefined || v === null) return undefined;
		return v.toString();
	}

	function getInterviewerValue(index: number) {
		// If editMeeting aren't returned 'validation-error', get values from meeting prop
		if (state?.result !== 'validation-error') {
			const v = meeting.interviewers;

			if (!Array.isArray(v)) return undefined;

			const value = v[index];
			return value !== undefined ? value.toString() : undefined;
		}
		// Else, get values from editMeeting
		const v = state.values.interviewers;

		if (!Array.isArray(v)) return undefined;

		const value = v[index];
		return value !== undefined ? value.toString() : undefined;
	}

	useEffect(() => {
		getVacancies().then((value) => {
			if (value?.userCrm?.vacancies) {
				setVacancies(value.userCrm.vacancies);
			}
		});
		getCandidates().then((value) => {
			if (value?.userCrm?.candidates) {
				setCandidates(value.userCrm.candidates);
			}
		});
	}, []);
	return (
		<div className='backdrop-blur-sm bg-black/50 dark:bg-black/75 fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center'>
			<div className='max-w-[1600px] w-full h-[90%] mx-auto px-5'>
				<div className='h-full bg-white dark:bg-zinc-900 rounded-2xl px-30 py-10'>
					<div className='h-full w-full overflow-y-scroll flex flex-col items-center pr-10'>
						<div className='w-full pb-5 mb-10'>
							<div className='w-full flex items-center justify-between'>
								<h2 className='text-3xl font-medium text-center'>{t('EditFormTitle')}</h2>
								<div className='flex items-center gap-8'>
									<label
										htmlFor='submitButton'
										className='cursor-pointer text-white bg-violet-600 hover:bg-violet-700 transition-colors duration-200 px-6
										py-2 rounded-2xl text-lg flex items-center font-medium gap-2'
									>
										{t('Save')}
									</label>
									<button
										onClick={() => setOpenForm(false)}
										className='cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 px-6
								py-2 rounded-2xl text-lg flex items-center font-medium border border-zinc-300 dark:border-zinc-700 gap-2'
									>
										{t('Cancel')}
									</button>
								</div>
							</div>
							{state?.result === 'invalid-vacancy' && <div className='text-red-500'>invalid vacancy</div>}
							{state?.result === 'invalid-candidate' && (
								<div className='text-red-500'>invalid candidate</div>
							)}
							{state?.result === 'db-error' && <div className='text-red-500'>database error</div>}
						</div>
						<form action={action} className='flex flex-col gap-3.5 mb-10 w-full'>
							<div className='grid grid-cols-2 justify-between gap-8 mb-5'>
								<div className='flex flex-col justify-baseline items-baseline gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600 dark:text-zinc-400'>
										{t('Date')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 dark:focus:bg-zinc-800 text-black dark:text-white px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300 dark:border-zinc-700'
											type='date'
											name='date'
											defaultValue={getValue('date')}
										/>
									</div>
									{state?.result === 'validation-error' && state.errors.date && (
										<div className='text-[14px] h-[14px] text-red-500 mt-2'>
											{state.errors.interviewType}
										</div>
									)}
								</div>
								<div className='flex flex-col justify-baseline items-baseline gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600 dark:text-zinc-400'>
										{t('Time')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 dark:focus:bg-zinc-800 text-black dark:text-white px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300 dark:border-zinc-700'
											type='time'
											name='time'
											defaultValue={getValue('time')}
										/>
									</div>
									{state?.result === 'validation-error' && state.errors.time && (
										<div className='text-[14px] h-[14px] text-red-500 mt-2'>
											{state.errors.interviewType}
										</div>
									)}
								</div>
								<div className='flex flex-col justify-baseline items-baseline gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600 dark:text-zinc-400'>
										{t('Link')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 dark:focus:bg-zinc-800 text-black dark:text-white px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300 dark:border-zinc-700'
											type='url'
											name='url'
											defaultValue={getValue('url')}
										/>
									</div>
									{state?.result === 'validation-error' && state.errors.url && (
										<div className='text-[14px] h-[14px] text-red-500 mt-2'>
											{state.errors.interviewType}
										</div>
									)}
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600 dark:text-zinc-400'>
										Interview:
										<select
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 dark:focus:bg-zinc-800 text-black dark:text-white px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300 dark:border-zinc-700'
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
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'validation-error' && state.errors.interviewType && (
											<div className='text-[14px] h-[14px] text-red-500 mt-2'>
												{state.errors.interviewType}
											</div>
										)}
									</div>
								</div>
								<div className='w-full flex flex-col items-start justify-between text-zinc-600 dark:text-zinc-400 col-span-full'>
									{t('Note')}:
									<textarea
										className='cursor-pointer w-full h-28 mt-2 focus:outline-0 focus:bg-zinc-100 dark:focus:bg-zinc-800 text-black dark:text-white px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300 dark:border-zinc-700'
										name='note'
										defaultValue={getValue('note')}
									/>
								</div>
								<div className='flex flex-col justify-baseline items-baseline gap-2'>
									<div className='text-zinc-600 dark:text-zinc-400'>
										{t('Interviewers')}:
										<li className='list-none flex flex-col gap-2 my-5'>
											{interviewers.map((interviewerId) => (
												<div className='flex gap-3' key={interviewerId}>
													<div className='max-w-85 w-full'>
														<input
															className='cursor-pointer focus:outline-0 focus:bg-zinc-100 dark:focus:bg-zinc-800 text-black dark:text-white px-3 py-1 mb-2 rounded-xl text-[18px] flex items-center border border-zinc-300 dark:border-zinc-700'
															type='text'
															name='interviewers'
															defaultValue={getInterviewerValue(interviewerId)}
														/>
														{state?.result === 'validation-error' &&
															state.errors.interviewers?.[interviewerId] && (
																<div className='text-[14px] h-[14px] text-red-500 my-2'>
																	{state.errors.interviewers?.[interviewerId]}
																</div>
															)}
													</div>
													<button
														className='cursor-pointer'
														onClick={() => deleteInterviewer(interviewerId)}
													>
														<div
															className={`h-6 w-6 mask-[url(/images/close.svg)] mask-center mask-contain mask-no-repeat bg-zinc-700 dark:bg-white`}
														></div>
													</button>
												</div>
											))}
										</li>
									</div>
									<button
										type='button'
										className='cursor-pointer px-10 py-2 rounded-xl text-[16px] flex items-center border border-zinc-300 dark:border-zinc-700 bg-purple-700 text-white hover:bg-white hover:text-black dark:text-white component-transition'
										onClick={addInterviewer}
									>
										{t('AddInterviewer')}
									</button>
								</div>
							</div>
							{/*Vacancy linking*/}
							{vacancies && vacancies.length > 0 && (
								<div className='flex flex-col gap-5 mt-3 pt-7 border-t border-zinc-300 dark:border-zinc-700'>
									<input type='hidden' value={vacancyInput} name='vacancyId' />
									<div className='flex justify-between items-center'>
										<div className='text-zinc-600 dark:text-zinc-400'>{t('LinkVacancy')}:</div>
									</div>
									<div className='grid grid-cols-3 gap-5 items-center justify-center'>
										{vacancies.map((vacancy) => (
											<VacancyForLinking
												key={vacancy.id}
												vacancy={vacancy}
												vacancyInput={vacancyInput}
												setVacancyInput={setVacancyInput}
											/>
										))}
									</div>
								</div>
							)}
							{/*Candidate linking*/}
							{candidates && candidates.length > 0 && (
								<div className='flex flex-col gap-5 mt-3 pt-7 border-t border-zinc-300 dark:border-zinc-700'>
									<input type='hidden' value={candidateInput} name='candidateId' />
									<div className='flex justify-between items-center'>
										<div className='text-zinc-600 dark:text-zinc-400'>{t('LinkCandidates')}:</div>
									</div>
									<div className='grid grid-cols-3 gap-5 justify-center'>
										{candidates.map((candidate) => (
											<div
												key={candidate.id}
												onClick={(event) => {
													event.stopPropagation();
													event.preventDefault();
													setCandidateInput((prev) =>
														prev === candidate.id.toString() ? '' : candidate.id.toString(),
													);
												}}
											>
												<CandidateForLinking
													candidate={candidate}
													isActive={candidateInput === candidate.id.toString()}
												/>
											</div>
										))}
									</div>
								</div>
							)}
							<button type='submit' id='submitButton' hidden={true}></button>
						</form>
						<form
							className='self-end'
							action={async () => {
								await deleteMeeting(meeting.id);
								setOpenForm(false);
							}}
						>
							<button
								type='submit'
								className='cursor-pointer transition-colors duration-200 px-6
								py-2 rounded-2xl text-lg flex items-center font-medium border hover:bg-red-100 dark:hover:bg-red-900 border-red-500 text-red-500 gap-2'
							>
								{t('Delete')}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
