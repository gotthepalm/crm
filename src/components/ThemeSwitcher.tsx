'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;
	return (
		<button
			className='flex items-center justify-center rounded-md h-10 w-10 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2'
			onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
		>
			{theme === 'light' ? (
				<div className='h-6 w-6 mask-[url(/images/dark-mode.svg)] mask-contain mask-center mask-no-repeat bg-black'></div>
			) : theme === 'dark' ? (
				<div className='h-6 w-6 mask-[url(/images/light-mode.svg)] mask-contain mask-center mask-no-repeat bg-white'></div>
			) : null}
		</button>
	);
}
