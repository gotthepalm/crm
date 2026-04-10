"use client";

import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
	const { setTheme } = useTheme()

	return (
		<div className="flex gap-2 items-center">
			<button className="hover:text-black/60 hover:[text-shadow:0_0_8px_rgba(130,0,219,0.6)] component-transition" onClick={() => setTheme("light")}>light</button>
			|
			<button className="hover:text-black/60 hover:[text-shadow:0_0_8px_rgba(130,0,219,0.6)] component-transition" onClick={() => setTheme("dark")}>dark</button>
		</div>
	);
}