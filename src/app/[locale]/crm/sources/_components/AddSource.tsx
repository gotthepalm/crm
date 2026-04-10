'use client';

import { useTranslations } from 'use-intl';
import { useActionState, useEffect, useState } from 'react';
import { ActionState, createSource } from '@/src/app/[locale]/crm/sources/_actions/createSourceAction';
import { useRouter } from 'next/navigation';

export default function AddSource() {
	const t = useTranslations('AddSource');

	const [openForm, setOpenForm] = useState<boolean>(false);

	const router = useRouter();

	const [state, action] = useActionState<ActionState | null, FormData>(async (_prev, formData) => {
		const state = await createSource(formData);
		if (state.result === 'success') {
			router.refresh();
			setOpenForm(false);
		}
		return state;
	}, null);

	const isValidationError = state?.result === 'validation-error';

	function getValue(name: string) {
		if (state?.result !== 'validation-error') return undefined;

		const v = state.values[name];

		if (v === undefined || v === null) return undefined;
		return v.toString();
	}

	useEffect(() => {
		document.body.style.overflow = openForm ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [openForm]);

	return (
		<>
			{openForm && (
				<div className='backdrop-blur-sm bg-black/50 fixed inset-0 z-50 h-100dvh w-100dvw flex items-center justify-center'>
					<div className='max-w-[1600px] w-full h-[70%] mx-auto px-5'>
						<div className='h-full bg-white rounded-2xl px-30 py-10'>
							<div className='h-full w-full flex flex-col items-center pr-10'>
								<div className='w-full pb-5 mb-10'>
									<div className='w-full flex items-center justify-between'>
										<h2 className='text-3xl font-medium text-center'>{t('FormTitle')}</h2>
										<div className='flex items-center gap-8'>
											<label
												htmlFor='submitButton'
												className='cursor-pointer text-white bg-violet-600 hover:bg-violet-700 transition-colors duration-200 px-6
										py-2 rounded-2xl text-lg flex items-center font-medium gap-2'
											>
												{t('Create')}
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
									<form action={action} className='mt-10 w-full mb-5'>
										<div className='flex flex-col justify-baseline items-baseline gap-2 mb-3'>
											<div className='w-full flex items-center justify-between text-zinc-600'>
												{t('Name')}:
												<input
													className='cursor-pointer w-[80%] focus:outline-0 focus:bg-zinc-100 text-black px-3 py-1 rounded-xl text-[18px] flex items-center border border-zinc-300'
													type='text'
													name='name'
													defaultValue={getValue('name')}
												/>
											</div>
											{isValidationError &&
												state.errors.name?.map((err, index) => (
													<div key={index} className='text-[14px] h-[14px] text-red-500 mt-2'>
														{err}
													</div>
												))}
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
												state.errors.url?.map((err, index) => (
													<div key={index} className='text-[14px] h-[14px] text-red-500 mt-2'>
														{err}
													</div>
												))}
										</div>
										<button type='submit' id='submitButton' hidden={true}></button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<button
				onClick={() => setOpenForm(true)}
				className='flex justify-center items-center gap-3 bg-white hover:bg-purple-700 hover:text-white border border-zinc-300 text-[22px] p-3 mb-5 rounded-2xl w-full component-transition cursor-pointer'
			>
				<span className='text-4xl font-light'>+</span>
				{t('AddSource')}
			</button>
		</>
	);
}
