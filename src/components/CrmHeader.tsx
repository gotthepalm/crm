import React from 'react';

export default function CrmHeader({children}: Readonly<{ children: React.ReactNode }>) {
    return (
		<header className='w-full max-w-[calc(100%-240px)] h-20 bg-white border-b border-b-zinc-200 fixed'>
			{children}
		</header>
    )
}