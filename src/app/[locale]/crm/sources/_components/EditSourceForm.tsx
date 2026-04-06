'use client';

import { useTranslations } from 'use-intl';
import { Dispatch, SetStateAction, useActionState } from 'react';
import { ActionState } from '@/src/app/[locale]/crm/sources/_actions/createSourceAction';
import { useRouter } from 'next/navigation';
import { editSource } from '@/src/app/[locale]/crm/sources/_actions/editSourceAction';
import { SourceModel } from '@/src/generated/prisma/models/Source';
import deleteSource from '@/src/app/[locale]/crm/sources/_actions/deleteSourceAction';

export default function EditSourceForm({
	setOpenForm,
	source,
}: {
	setOpenForm: Dispatch<SetStateAction<boolean>>;
	source: SourceModel;
}) {
	const t = useTranslations('AddSource');

	const router = useRouter();

	const [state, action] = useActionState<ActionState | null, FormData>(async (_prev, formData) => {
		const state = await editSource(formData, source.id);
		if (state.result === 'success') {
			router.refresh();
			setOpenForm(false);
		}
		return state;
	}, null);

	const isValidationError = state?.result === 'validation-error';

	function getValue(name: keyof SourceModel) {
		if (state?.result !== 'validation-error') {
			const v = source[name];

			if (v === undefined || v === null) return undefined;
			return v.toString();
		}
		const v = state.values[name];

		if (v === undefined || v === null) return undefined;
		return v.toString();
	}
	return (
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
							<form action={action} className='flex flex-col gap-3.5 mt-10 w-full'>
								<div className='flex flex-col gap-8 mb-5'>
									<div className='flex flex-col justify-baseline items-baseline gap-2'>
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
								</div>
								<button type='submit' id='submitButton' hidden={true}></button>
							</form>
							<form
								className='flex justify-end w-full'
								action={async () => {
									await deleteSource(source.id);
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
		</div>
	);
}
