'use client';

import { useState } from 'react';

type Vacancy = {
	id: number;
	vacancyName: string;
	vacancyDescription: string;
	priority: string;
	department: string;
	vacancyQuantity: number;
	hiredQuantity: number;
	data: string;
};

const vacancies: Vacancy[] = [
	{
		id: 1,
		vacancyName: 'Crypto Facebook Assistant',
		vacancyDescription: '...',
		priority: 'High',
		department: 'Facebook',
		vacancyQuantity: 6,
		hiredQuantity: 4,
		data: '06.03.2026',
	},
];

export default function Candidates() {
	const [addCandidateForm, setAddCandidateForm] = useState<boolean>(false);
	const priorities = ['High', 'Medium', 'Low'];
	const [selectedPriority, setSelectedPriority] = useState<false | string>(false);
	const [prioritySelectOpen, setPrioritySelectOpen] = useState(false);

	return (
		<div className='w-full'>
			<button
				className='flex justify-center items-center gap-3 bg-white text-[22px] p-3 mb-5 rounded-2xl w-full cursor-pointer'
				onClick={() => setAddCandidateForm((prev) => !prev)}
			>
				<span className='material-symbols-rounded'>add_2</span>
				Add candidate
			</button>
			{addCandidateForm && (
				<div className='fixed inset-0 flex items-center justify-center bg-black/50'>
					<div className='relative bg-white p-6 rounded-xl shadow-lg'>
						<h1 className='text-3xl text-center font-extrabold uppercase mb-5'>Add a new vacancy</h1>

						<form className='flex flex-col gap-3.5 max-w-2xl w-full'>
							<input
								type='text'
								name='vacancyName'
								placeholder='Vacancy name'
								className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
							/>
							<input
									type='text'
									name='vacancyDesription'
									placeholder='Vacancy description'
									className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
								/>
							<input
								type='text'
								name='departament'
								placeholder='Department'
								className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
							/>
							<div className='grid grid-cols-2 gap-4'>
								<input
									type='number'
									name='vacancyQuantity'
									placeholder='Vacancy quantity'
									className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
								/>
								<div className='relative w-full'>
									<button
										type='button'
										onClick={() => setPrioritySelectOpen(!prioritySelectOpen)}
										className={`w-full p-3 pl-7 pr-10 ${selectedPriority ? '' : 'text-black/60'} text-left rounded-2xl border border-[#d9d9d9]`}
									>
										{selectedPriority ? selectedPriority : 'Priority'}
									</button>
									<span
										className={`material-symbols-rounded pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 component-transition ${prioritySelectOpen ? '' : '-rotate-90'}`}
									>
										keyboard_arrow_down
									</span>

									{prioritySelectOpen && (
										<ul className='absolute mt-2 w-full bg-white border border-[#d9d9d9] rounded-2xl shadow-lg overflow-hidden'>
											{priorities.map((priority) => (
												<li
													key={priority}
													onClick={() => {
														setSelectedPriority(priority);
														setPrioritySelectOpen(false);
													}}
													className='px-6 py-3 cursor-pointer hover:bg-zinc-100'
												>
													{priority}
												</li>
											))}
										</ul>
									)}
								</div>
							</div>
							<button
								type='submit'
								className='uppercase flex items-center justify-center px-3 h-12 leading-12 bg-purple-700 hover:bg-transparent border-2 border-purple-700 text-[14px] font-medium text-white hover:text-purple-700 rounded-2xl component-transition'
							>
								Add a new vacancy
							</button>
						</form>

						<button
							className='material-symbols-rounded absolute top-5 right-5 p-2 bg-gray-200 rounded cursor-pointer'
							onClick={() => setAddCandidateForm(false)}
						>
							close
						</button>
					</div>
				</div>
			)}
			<div className='w-full'>
				<li className={`${vacancies.length !== 0 ? 'grid grid-cols-3 gap-5' : 'flex justify-center'}`}>
					{vacancies.length !== 0 ? (
						vacancies.map((vacancy) => (
							<article
								key={vacancy.id}
								className='flex flex-col max-w-120 gap-2 p-5 bg-white rounded-2xl'
							>
								<h3 className='pl-2 font-semibold text-3xl w-max mb-2 p-2 text-white bg-purple-700 rounded-2xl'>{vacancy.vacancyName}</h3>
								<p className='pl-2'>
									<span className='text-zinc-600 italic text-[18px]'>Id: </span>
									{vacancy.id}
								</p>
								<p className='pb-2 pl-2 border-b border-zinc-300'>
									<span className='text-zinc-600 italic text-[18px]'>Priority: </span>
									{vacancy.priority}
								</p>
								<p className='pl-2'>
									<span className='text-zinc-600 italic text-[18px]'>Department: </span>
									{vacancy.department}
								</p>
								<p className='pb-2 pl-2 border-b border-zinc-300'>
									<span className='text-zinc-600 italic text-[18px]'>Quantity: </span>
									hired {vacancy.hiredQuantity} of {vacancy.vacancyQuantity}
								</p>
								<p className='pb-2 pl-2 border-b border-zinc-300'>
									<span className='text-zinc-600 italic text-[18px]'>Vacancy description: </span>
									{vacancy.vacancyDescription}
								</p>
								<p className='pl-2'>
									<span className='text-zinc-600 italic text-[18px]'>Data: </span>
									{vacancy.data}
								</p>
							</article>
						))
					) : (
						<h2 className='text-2xl'>There are no vacancies yet...</h2>
					)}
				</li>
			</div>
		</div>
	);
}
