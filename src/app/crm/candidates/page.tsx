'use client';
import { useState } from 'react';

type Candidate = {
	id: number;
	name: string;
	fullName: string;
	age: number;
	telegram: string;
	workType: string;
	jobTitle: string;
	vacancy: string;
};

const candidates: Candidate[] = [
	{
		id: 1,
		name: 'Паша',
		fullName: 'Павел Дуров',
		age: 34,
		telegram: '@durov',
		workType: 'Офис',
		jobTitle: 'Facebook Media Buier',
		vacancy: '/crm/vacancies/123',
	},
	{
		id: 2,
		name: 'Виталик',
		fullName: 'Виталий Денисюк',
		age: 17,
		telegram: '@gotthepalm',
		workType: 'Удаленка',
		jobTitle: 'Intern Frontend Developer',
		vacancy: '/crm/vacancies/124',
	},
];

export default function Candidates() {
	const [addCandidateForm, setAddCandidateForm] = useState<boolean>(false);
	const workTypes = ['Remote', 'Office', 'Hybrid'];
	const [selectedWorkType, setSelectedWorkType] = useState<false | string>(false);
	const [workTypeSelectOpen, setWorkTypeSelectOpen] = useState(false);

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
						<h1 className='text-3xl text-center font-extrabold uppercase mb-5'>Add a new candidate</h1>

						<form className='flex flex-col gap-3.5 max-w-2xl w-full'>
							<input
								type='text'
								name='name'
								placeholder="Candidate's name"
								className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
							/>
							<input
								type='text'
								name='fullName'
								placeholder='Full name'
								className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
							/>
							<input
								type='text'
								name='jobTitle'
								placeholder='Job title'
								className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
							/>
							<div className='grid grid-cols-2 gap-4'>
								<input
									type='number'
									name='age'
									placeholder='Age'
									className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
								/>
								<input
									type='text'
									name='telegram'
									placeholder='@Telegram'
									className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
								/>
							</div>
							<div className='grid grid-cols-2 gap-4 mb-3.5'>
								<div className='relative w-full'>
									<button
										type='button'
										onClick={() => setWorkTypeSelectOpen(!workTypeSelectOpen)}
										className={`w-full p-3 pl-7 pr-10 ${selectedWorkType ? '' : 'text-black/60'} text-left rounded-2xl border border-[#d9d9d9]`}
									>
										{selectedWorkType ? selectedWorkType : 'Type of work'}
									</button>
									<span
										className={`material-symbols-rounded pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 component-transition ${workTypeSelectOpen ? '' : '-rotate-90'}`}
									>
										keyboard_arrow_down
									</span>

									{workTypeSelectOpen && (
										<ul className='absolute mt-2 w-full bg-white border border-[#d9d9d9] rounded-2xl shadow-lg overflow-hidden'>
											{workTypes.map((workType) => (
												<li
													key={workType}
													onClick={() => {
														setSelectedWorkType(workType);
														setWorkTypeSelectOpen(false);
													}}
													className='px-6 py-3 cursor-pointer hover:bg-zinc-100'
												>
													{workType}
												</li>
											))}
										</ul>
									)}
								</div>
								<input
									type='text'
									name='vacancy'
									placeholder='Vacancy'
									className='w-full p-3 pl-7 rounded-2xl bg-transparent outline-none placeholder:text-black/60 text-black border border-[#d9d9d9]'
								/>
							</div>

							<button
								type='submit'
								className='uppercase flex items-center justify-center px-3 h-12 leading-12 bg-purple-700 hover:bg-transparent border-2 border-purple-700 text-[14px] font-medium text-white hover:text-purple-700 rounded-2xl component-transition'
							>
								Add a new candidate
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
			<li className={`${candidates.length !== 0 ? 'grid grid-cols-3 gap-5' : 'flex justify-center'}`}>
				{candidates.length !== 0 ? (
					candidates.map((candidate) => (
						<article key={candidate.id} className='flex flex-col max-w-120 gap-2 p-5 bg-white rounded-2xl'>
							<h3 className='pb-2 pl-2 font-semibold text-3xl'>{candidate.name}</h3>
							<p className='w-max mb-2 p-2 text-white text-[18px] bg-purple-700 rounded-2xl'>
								{candidate.jobTitle}
							</p>
							<p className='py-2 pl-2 border-b border-t border-zinc-300'>
								<span className='text-zinc-600 italic text-[18px]'>Full name: </span>
								{candidate.fullName}
							</p>
							<p className='pb-2 pl-2 border-b border-zinc-300'>
								<span className='text-zinc-600 italic text-[18px]'>Age: </span>
								{candidate.age}
							</p>
							<a
								className='pb-2 pl-2 border-b border-zinc-300'
								href={`https://t.me/${candidate.telegram.slice(1)}`}
							>
								<span className='text-zinc-600 italic text-[18px]'>Telegram: </span>
								<span className='underline'>{candidate.telegram}</span>
							</a>
							<p className='pb-2 pl-2 border-b border-zinc-300'>
								<span className='text-zinc-600 italic text-[18px]'>Type of work: </span>
								{candidate.workType}
							</p>
							<p className='pl-2'>
								<span className='text-zinc-600 italic text-[18px]'>Vacancy: </span>
								{candidate.vacancy}
							</p>
						</article>
					))
				) : (
					<h2>There are no candidates yet...</h2>
				)}
			</li>
		</div>
	);
}
