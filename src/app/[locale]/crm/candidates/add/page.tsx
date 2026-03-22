'use client';

import CrmHeader from '@/src/components/CrmHeader';
import Link from 'next/link';
import Image from 'next/image';
import { useActionState } from 'react';
import { ActionState, createCandidate } from '@/src/app/[locale]/crm/candidates/_actions/createCandidateAction';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';
import { useTranslations } from 'use-intl';

export default function CandidatesAdd() {
	const router = useRouter();
	const t = useTranslations('AddCandidate');
	const [state, action] = useActionState<ActionState | null, FormData>(async (_prev, formData) => {
		const state = await createCandidate(formData);
		if (state.result === 'success') {
			router.push('/crm/candidates');
		}
		return state;
	}, null);

	function getValue(name: string) {
		if (state?.result !== "validation-error") return undefined

		const v = state.values[name]

		if (v === undefined || v === null) return undefined
		return v.toString()
	}
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
							href={'/crm/candidates'}
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
						<h2 className='text-3xl font-medium text-center pb-5'>
							{t('FormTitle')}
						</h2>
						<form action={action} className='flex flex-col gap-3.5 mt-10 w-full'>
							<div className='grid grid-cols-2 justify-between gap-8 mb-5'>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Name')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
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
											name='status'
											key={getValue('status')}
											defaultValue={
												getValue('status')}
										>
											<option value='NEW'>{t("Option.New")}</option>
											<option value='SCREENING'>{t("Option.Screening")}</option>
											<option value='INTERVIEW'>{t("Option.Interview")}</option>
											<option value='TECH_INTERVIEW'>{t("Option.TechInterview")}</option>
											<option value='OFFER'>{t("Option.Offer")}</option>
											<option value='HIRED'>{t("Option.Hired")}</option>
											<option value='REJECTED'>{t("Option.Rejected")}</option>
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
										className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='tel'
										name='phone'
										defaultValue={
										getValue('phone')}
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Email')}:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
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
										className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='text'
										name='position'
										defaultValue={
											getValue('position')}
									/>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									{t('Location')}:
									<input
										className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='text'
										name='location'
										defaultValue={
											getValue('location')}
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										{t('Experience')}:
										<div className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
											<input
												className='w-10 text-black'
												type='number'
												name='experienceYears'
												defaultValue={
													getValue('experienceYears')}
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
								<div className='text-zinc-600 col-span-full'>
									{t('ExpectedSalary')}:
									<div className='grid grid-cols-2 gap-8 w-full'>
										<div className='flex flex-col gap-2'>
											<div className='flex w-full items-center justify-between text-zinc-600'>
												{t('From')}:
												<div className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
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
												<div className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
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
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
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
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
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
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
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
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='url'
											name='portfolioUrl'
											defaultValue={getValue('portfolioUrl')}
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'validation-error' && state.errors.portfolioUrl?.map((err, index) => (
											<div key={index}>{err}</div>
										))}
									</div>
								</div>
								<div className='w-full flex flex-col items-start justify-between text-zinc-600 col-span-full'>
									{t('Note')}:
									<textarea
										className='cursor-pointer w-full h-28 mt-2 focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										name='note'
										defaultValue={getValue('note')}
									/>
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
