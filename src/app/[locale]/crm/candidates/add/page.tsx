'use client';

import CrmHeader from '@/src/components/CrmHeader';
import Link from 'next/link';
import Image from 'next/image';
import { useActionState } from 'react';
import { createCandidate } from '@/src/app/[locale]/crm/candidates/add/createCandidateAction';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';

export default function CandidatesAdd() {
	const router = useRouter();
	const [state, action] = useActionState(async (prev: { result: string } | null, formData: FormData) => {
		const state = await createCandidate(formData);
		if (state.result === 'success') {
			router.push('/crm/candidates');
		}
		return state;
	}, null);
	return (
		<>
			<CrmHeader>
				<div className='w-full h-full px-10 flex items-center justify-between'>
					<Link href='/public' className='flex items-center gap-2'>
						<Image src={'/images/bloom-icon.svg'} height={40} width={40} alt='bloom icon' />
					</Link>
					<div className='flex items-center gap-8'>
						<label
							htmlFor='submitButton'
							className='cursor-pointer bg-violet-700 text-white hover:bg-violet-800 transition-colors duration-200 px-6
						py-2 rounded-2xl text-lg flex items-center font-medium border gap-2'
						>
							Create
						</label>
						<Link
							href={'/crm/candidates'}
							className='cursor-pointer hover:bg-zinc-100 transition-colors duration-200 px-6
						py-2 rounded-2xl text-lg flex items-center font-medium border border-zinc-300 gap-2'
						>
							Cancel
						</Link>
						<LanguageSwitcher />
					</div>
				</div>
			</CrmHeader>
			<main className='bg-white'>
				<div className='w-full max-w-[1500px] mx-auto pt-20'>
					<div className='w-full py-12 px-32'>
						<h2 className='text-3xl font-medium text-center pb-5 border-b border-zinc-300'>Create Candidate</h2>
						<form action={action} className='flex flex-col gap-3.5 mt-10 w-full'>
							<div className='grid grid-cols-2 justify-between gap-8 mb-5'>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										Name:
										<input
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
											type='text'
											name='name'
										/>
									</div>
									<div className='text-[14px] h-[14px] text-red-500'>
										{state?.result === 'name-required' && 'Name required'}
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='w-full flex items-center justify-between text-zinc-600'>
										Status:
										<select
											className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
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
										{state?.result === 'invalid-status' && 'Invalid status'}
									</div>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									Phone:
									<input
										className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='tel'
										name='phone'
									/>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									Email:
									<input
										className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='email'
										name='email'
									/>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									Position:
									<input
										className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='text'
										name='position'
									/>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									Address:
									<input
										className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='text'
										name='location'
									/>
								</div>
								<div className='grid- flex items-center justify-between text-zinc-600'>
									Experience:
									<div className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
										<input className='w-10 text-black' type='number' name='experience' />
										Years
									</div>
								</div>
								<div className='text-zinc-600 col-span-full'>
									Expected Salary:
									<div className='grid grid-cols-2 gap-8 w-full'>
										<div className='flex w-full items-center justify-between text-zinc-600'>
											From:
											<div className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
												<input
													className='w-full text-black'
													type='number'
													name='salaryExpectationBottom'
												/>
												$
											</div>
										</div>
										<div className='flex w-full items-center justify-between text-zinc-600'>
											To:
											<div className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'>
												<input
													className='w-full text-black'
													type='number'
													name='salaryExpectationTop'
												/>
												$
											</div>
										</div>
									</div>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									Resume Url:
									<input
										className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='url'
										name='resumeUrl'
									/>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									LinkedIn Url:
									<input
										className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='url'
										name='linkedinUrl'
									/>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									GitHub Url:
									<input
										className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='url'
										name='githubUrl'
									/>
								</div>
								<div className='flex items-center justify-between text-zinc-600'>
									Portfolio Url:
									<input
										className='cursor-pointer w-[70%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										type='url'
										name='portfolioUrl'
									/>
								</div>
								<div className='w-full flex flex-col items-start justify-between text-zinc-600 col-span-full'>
									Note:
									<textarea
										className='cursor-pointer w-full h-28 mt-2 focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
										name='note'
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
