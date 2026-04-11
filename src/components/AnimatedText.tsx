'use client';

import { useEffect, useState } from 'react';

type Props = {
	words: string[];
	typingSpeed?: number;
	deletingSpeed?: number;
	pauseTime?: number;
};

export default function AnimatedText({
	words,
	typingSpeed = 70,
	deletingSpeed = 40,
	pauseTime = 1000,
}: Props) {
	const [text, setText] = useState('');
	const [wordIndex, setWordIndex] = useState(0);
	const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

	useEffect(() => {
		const currentWord = words[wordIndex];
		let timeout: NodeJS.Timeout;

		if (phase === 'typing') {
			if (text.length < currentWord.length) {
				timeout = setTimeout(() => {
					setText(currentWord.slice(0, text.length + 1));
				}, typingSpeed);
			} else {
				timeout = setTimeout(() => {
					setPhase('pausing');
				}, pauseTime);
			}
		}

		if (phase === 'pausing') {
			timeout = setTimeout(() => {
				setPhase('deleting');
			}, pauseTime);
		}

		if (phase === 'deleting') {
			if (text.length > 0) {
				timeout = setTimeout(() => {
					setText(currentWord.slice(0, text.length - 1));
				}, deletingSpeed);
			} else {
				timeout = setTimeout(() => {
					setWordIndex((prev) => (prev + 1) % words.length);
					setPhase('typing');
				}, 300);
			}
		}

		return () => clearTimeout(timeout);
	}, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

	return (
		<span className='inline-flex items-center'>
			<span className='text-violet-700 font-semibold text-5xl'>{text}</span>
			<span className='ml-1 w-[4px] h-12 bg-violet-700' />
		</span>
	);
}
