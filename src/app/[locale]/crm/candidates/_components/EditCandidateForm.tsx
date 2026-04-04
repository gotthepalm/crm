'use client';

import { Dispatch, SetStateAction, useActionState, useEffect, useState } from 'react';
import { ActionState, editCandidate } from '@/src/app/[locale]/crm/candidates/_actions/editCandidateAction';
import { useTranslations } from 'use-intl';
import { CandidateModel } from '@/src/generated/prisma/models/Candidate';
import { useRouter } from 'next/navigation';
import { deleteCandidate } from '@/src/app/[locale]/crm/candidates/_actions/deleteCandidateAction';
import VacancyForLinking from '@/src/app/[locale]/crm/candidates/_components/VacancyForLinking';
import { getVacancies } from '@/src/app/[locale]/crm/candidates/_actions/getVacanciesAction';
import { VacancyModel } from '@/src/generated/prisma/models/Vacancy';

export default function EditCandidateForm({
	setOpenForm,
	candidate,
	isCandidateModal
}: {
	setOpenForm: Dispatch<SetStateAction<boolean>>;
	candidate: CandidateModel;
	isCandidateModal: boolean;
}) {
	const [vacancies, setVacancies] = useState<VacancyModel[] | null>(null);
	const [vacancyInput, setVacancyInput] = useState<string>(candidate.vacancyId ? candidate.vacancyId.toString() : '');

	const router = useRouter();
	const t = useTranslations('AddCandidate');

	const [state, action] = useActionState<ActionState | null, FormData>(async (_prev, formData) => {
		const state = await editCandidate(formData, candidate.id);
		if (state.result === 'success') {
			router.refresh();
			setOpenForm(false);
		}
		return state;
	}, null);

	function getValue(name: keyof CandidateModel) {
		// If editCandidate returned 'validation-error', get values from editCandidate
		if (state?.result === 'validation-error') {
			const v = state.values[name];

			if (v === undefined || v === null) return undefined;
			return v.toString();
		}
		// Else get values from candidate prop
		const v = candidate[name];

		if (v === undefined || v === null) return undefined;
		return v.toString();
	}

	useEffect(() => {
		getVacancies().then((value) => {
			if (value?.userCrm?.vacancies) {
				setVacancies(value.userCrm.vacancies);
			}
		});
	}, []);

	return (
		<div
			className={
				`${!isCandidateModal && 'backdrop-blur-sm bg-black/50'} fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center`
			}
		>
			<div className='max-w-[1600px] w-full h-[90%] mx-auto px-5'>
				<div className='h-full bg-white rounded-2xl px-30 py-10'>
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
										className='cursor-pointer hover:bg-zinc-100 transition-colors duration-200 px-6
								py-2 rounded-2xl text-lg flex items-center font-medium border border-zinc-300 gap-2'
									>
										{t('Cancel')}
									</button>
								</div>
							</div>
							{state?.result === 'invalid-vacancy' && <div className='text-red-500'>invalid vacancy</div>}
							{state?.result === 'db-error' && <div className='text-red-500'>database error</div>}
						</div>
						<form action={action} className='flex flex-col gap-3.5 w-full mb-10'>
							<div className='grid grid-cols-2 justify-between gap-8'>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Name')}:
										<input
											className='cursor-text w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='text'
											name='name'
											defaultValue={getValue('name')}
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'validation-error' &&
											state.errors.name?.map((err, index) => <div key={index}>{err}</div>)}
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Status')}:
										<select
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											key={getValue('status')}
											defaultValue={getValue('status')}
											name='status'
										>
											<option value='NEW'>New</option>
											<option value='SCREENING'>Screening</option>
											<option value='INTERVIEW'>Interview</option>
											<option value='TECH_INTERVIEW'>Tech Interview</option>
											<option value='OFFER'>Offer</option>
											<option value='HIRED'>Hired</option>
											<option value='REJECTED'>Rejected</option>
										</select>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'validation-error' &&
											state.errors.status?.map((err, index) => <div key={index}>{err}</div>)}
									</div>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									{t('Phone')}:
									<input
										className='cursor-text w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='tel'
										name='phone'
										defaultValue={getValue('phone')}
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Email')}:
										<input
											className='cursor-text w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='email'
											name='email'
											defaultValue={getValue('email')}
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'validation-error' &&
											state.errors.email?.map((err, index) => <div key={index}>{err}</div>)}
									</div>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									{t('Position')}:
									<input
										className='cursor-text w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='text'
										name='position'
										defaultValue={getValue('position')}
									/>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									{t('Location')}:
									<input
										className='cursor-text w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='text'
										name='location'
										defaultValue={getValue('location')}
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Age')}:
										<div className='cursor-text w-[80%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
											<input
												className='w-10 text-black'
												type='number'
												name='age'
												defaultValue={getValue('age')}
											/>
											{t('Years')}
										</div>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'validation-error' &&
											state.errors.age?.map((err, index) => <div key={index}>{err}</div>)}
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Experience')}:
										<div className='cursor-text w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
											<input
												className='w-10 text-black'
												type='number'
												name='experienceYears'
												defaultValue={getValue('experienceYears')}
											/>
											{t('Years')}
										</div>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'validation-error' &&
											state.errors.experienceYears?.map((err, index) => (
												<div key={index}>{err}</div>
											))}
									</div>
								</div>
								<div className='col-span-full w-full flex items-center justify-between text-zinc-600'>
									{t('Skills')}:
									<input
										className='cursor-text w-[90%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='text'
										name='skills'
										defaultValue={getValue('skills')}
									/>
								</div>
								<div className='text-zinc-600 col-span-full'>
									{t('ExpectedSalary')}:
									<div className='grid grid-cols-2 gap-8 w-full'>
										<div className='flex flex-col gap-2'>
											<div className='flex w-full items-center justify-between text-zinc-600'>
												{t('From')}:
												<div className='cursor-text w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
													<input
														className='w-full text-black'
														type='number'
														name='salaryExpectationBottom'
														defaultValue={getValue('salaryExpectationBottom')}
													/>
													$
												</div>
											</div>
											<div className='text-[14px] h-[14px] text-red-500'>
												{state?.result === 'validation-error' &&
													state.errors.salaryExpectationBottom?.map((err, index) => (
														<div key={index}>{err}</div>
													))}
											</div>
										</div>
										<div className='flex flex-col gap-2'>
											<div className='flex w-full items-center justify-between text-zinc-600'>
												{t('To')}:
												<div className='cursor-text w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
													<input
														className='w-full text-black'
														type='number'
														name='salaryExpectationTop'
														defaultValue={getValue('salaryExpectationTop')}
													/>
													$
												</div>
											</div>
											<div className='text-[14px] h-[14px] text-red-500'>
												{state?.result === 'validation-error' &&
													state.errors.salaryExpectationTop?.map((err, index) => (
														<div key={index}>{err}</div>
													))}
											</div>
										</div>
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('ResumeUrl')}:
										<input
											className='cursor-text w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='url'
											name='resumeUrl'
											defaultValue={getValue('resumeUrl')}
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'validation-error' &&
											state.errors.resumeUrl?.map((err, index) => <div key={index}>{err}</div>)}
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('LinkedInUrl')}:
										<input
											className='cursor-text w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='url'
											name='linkedinUrl'
											defaultValue={getValue('linkedinUrl')}
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'validation-error' &&
											state.errors.linkedinUrl?.map((err, index) => <div key={index}>{err}</div>)}
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('GitHubUrl')}:
										<input
											className='cursor-text w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='url'
											name='gitHubUrl'
											defaultValue={getValue('gitHubUrl')}
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'validation-error' &&
											state.errors.gitHubUrl?.map((err, index) => <div key={index}>{err}</div>)}
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('PortfolioUrl')}:
										<input
											className='cursor-text w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='url'
											name='portfolioUrl'
											defaultValue={getValue('portfolioUrl')}
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'validation-error' &&
											state.errors.portfolioUrl?.map((err, index) => (
												<div key={index}>{err}</div>
											))}
									</div>
								</div>
								<div className='w-full flex flex-col items-start justify-between text-zinc-600 col-span-full'>
									{t('Note')}:
									<textarea
										className='cursor-text w-full h-28 mt-2 focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										name='note'
										defaultValue={getValue('note')}
									/>
								</div>
							</div>
							{/*Vacancies linking*/}
							{vacancies && vacancies.length > 0 && (
								<div className='flex flex-col gap-5 mt-3 pt-7 border-t border-zinc-300'>
									<input type='hidden' value={vacancyInput} name='vacancyId' />
									<div className='flex justify-between items-center'>
										<div className='text-zinc-600'>{t('LinkVacancy')}:</div>
									</div>
									<div className='grid grid-cols-3 gap-5 justify-center'>
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
							<button type='submit' id='submitButton' hidden={true}></button>
						</form>
						<form
							className='self-end'
							action={async () => {
								await deleteCandidate(candidate.id);
								setOpenForm(false);
							}}
						>
							<button
								type='submit'
								className='cursor-pointer transition-colors duration-200 px-6
								py-2 rounded-2xl text-lg flex items-center font-medium border hover:bg-red-100 border-red-500 text-red-500 gap-2'
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
