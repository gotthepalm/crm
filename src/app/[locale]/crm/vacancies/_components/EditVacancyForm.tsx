'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { VacancyModel } from '@/src/generated/prisma/models/Vacancy';
import { useTranslations } from 'use-intl';
import { ActionState, editVacancy } from '@/src/app/[locale]/crm/vacancies/_actions/editVacancyAction';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteVacancy } from '@/src/app/[locale]/crm/vacancies/_actions/deleteVacancyAction';
import { getCandidates } from '@/src/app/[locale]/crm/vacancies/_actions/getCandidatesAction';
import CandidateForLinking from '@/src/app/[locale]/crm/vacancies/_components/CandidateForLinking';
import { Prisma } from '@/src/generated/prisma/client';

export default function EditVacancyForm({
	setOpenForm,
	vacancy,
	isVacancyModal,
}: {
	setOpenForm: Dispatch<SetStateAction<boolean>>;
	vacancy: VacancyModel;
	isVacancyModal: boolean;
}) {
	const [candidates, setCandidates] = useState<Prisma.CandidateGetPayload<{ include: { vacancy: true } }>[] | null>(
		null,
	);

	const router = useRouter();
	const t = useTranslations('AddVacancy');

	const [state, action] = useActionState<ActionState | null, FormData>(async (_prev, formData) => {
		const state = await editVacancy(formData, vacancy.id);
		if (state.result === 'success') {
			router.refresh();
			setOpenForm(false);
		}
		return state;
	}, null);

	const isValidationError = state?.result === 'validation-error';

	// Candidates that linked to this vacancy
	const candidatesLinked = candidates
		?.filter((candidate) => candidate.vacancyId === vacancy.id)
		.map((candidate) => candidate.id);

	function getValue(name: keyof VacancyModel) {
		// If editVacancy returned 'validation-error', get values from editVacancy
		if (state?.result === 'validation-error') {
			const v = state.values[name];

			if (v === undefined || v === null) return undefined;
			return v.toString();
		}
		// Else get values from vacancy prop
		const v = vacancy[name];

		if (v === undefined || v === null) return undefined;
		return v.toString();
	}

	useEffect(() => {
		getCandidates().then((value) => {
			if (value?.userCrm?.candidates) {
				setCandidates(value.userCrm.candidates);
			}
		});
	}, []);
	return (
		<div
			className={`${!isVacancyModal && 'backdrop-blur-sm bg-black/50'} fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center`}
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
							{state?.result === 'invalid-candidates' && (
								<div className='text-red-500'>invalid candidates</div>
							)}
							{state?.result === 'db-error' && <div className='text-red-500'>database error</div>}
						</div>
						<form action={action} className='flex flex-col gap-3.5 mb-10 w-full'>
							<div className='grid grid-cols-2 justify-between gap-8 mb-5'>
								<div className='flex flex-col justify-baseline items-baseline gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Position')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='text'
											name='position'
											defaultValue={getValue('position')}
										/>
									</div>
									{isValidationError &&
										state.errors.position?.map((err, index) => (
											<div key={index} className='text-[14px] h-[14px] text-red-500 mt-2'>
												{err}
											</div>
										))}
								</div>
								{/*<div className='flex flex-col gap-2'>*/}
								<div className='w-full flex items-baseline justify-between text-zinc-600'>
									{t('Location')}:
									<input
										className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 ml-4 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='text'
										name='location'
										defaultValue={getValue('location')}
									/>
								</div>
								{/*</div>*/}
								<div className='w-full flex flex-col items-start justify-between text-zinc-600 col-span-full'>
									{t('Description')}:
									<textarea
										className='cursor-pointer w-full h-28 mt-2 focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										name='description'
										defaultValue={getValue('description')}
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
														defaultValue={getValue('salaryFrom')}
													/>
													$
												</div>
											</div>
											{isValidationError &&
												state.errors.salaryFrom?.map((err, index) => (
													<div key={index} className='text-[14px] h-[14px] text-red-500 mt-2'>
														{err}
													</div>
												))}
										</div>
										<div className='flex flex-col gap-2'>
											<div className='flex w-full items-center justify-between text-zinc-600'>
												{t('To')}:
												<div className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
													<input
														className='w-full text-black'
														type='number'
														name='salaryTo'
														defaultValue={getValue('salaryTo')}
													/>
													$
												</div>
											</div>
											{isValidationError &&
												state.errors.salaryTo?.map((err, index) => (
													<div key={index} className='text-[14px] h-[14px] text-red-500 mt-2'>
														{err}
													</div>
												))}
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
												defaultValue={getValue('experienceYears')}
											/>
											{t('Years')}
										</div>
									</div>
									{isValidationError &&
										state.errors.namexperienceYearse?.map((err, index) => (
											<div key={index} className='text-[14px] h-[14px] text-red-500 mt-2'>
												{err}
											</div>
										))}
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('VacancyStatus')}:
										<select
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											name='status'
											defaultValue={getValue('status')}
										>
											<option value='OPEN'>{t('Option.OPEN')}</option>
											<option value='IN_PROGRESS'>{t('Option.IN_PROGRESS')}</option>
											<option value='PAUSED'>{t('Option.PAUSED')}</option>
											<option value='CLOSED'>{t('Option.CLOSED')}</option>
										</select>
									</div>
									{isValidationError &&
										state.errors.status?.map((err, index) => (
											<div key={index} className='text-[14px] h-[14px] text-red-500 mt-2'>
												{err}
											</div>
										))}
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('EmploymentType')}:
										<select
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											name='employmentType'
											defaultValue={getValue('employmentType')}
										>
											<option value='FULL_TIME'>{t('Option.FULL_TIME')}</option>
											<option value='PART_TIME'>{t('Option.PART_TIME')}</option>
											<option value='CONTRACT'>{t('Option.CONTRACT')}</option>
											<option value='INTERNSHIP'>{t('Option.INTERNSHIP')}</option>
										</select>
									</div>
									{isValidationError &&
										state.errors.employmentType?.map((err, index) => (
											<div key={index} className='text-[14px] h-[14px] text-red-500 mt-2'>
												{err}
											</div>
										))}
								</div>
							</div>
							{/*Candidates linking*/}
							{candidates && candidates.length > 0 && (
								<div className='flex flex-col gap-5 mt-3 pt-7 border-t border-zinc-300'>
									<div className='flex justify-between items-center'>
										<div className='text-zinc-600'>{t('LinkCandidates')}:</div>
									</div>
									<div className='grid grid-cols-3 gap-5 justify-center'>
										{candidates.map((candidate) => (
											<CandidateForLinking
												key={candidate.id}
												candidate={candidate}
												candidatesLinked={candidatesLinked}
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
								await deleteVacancy(vacancy.id);
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
