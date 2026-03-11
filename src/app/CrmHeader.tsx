import React from 'react';

export default function CrmHeader({children}: Readonly<{ children: React.ReactNode }>) {
    return (
		<div className='w-full h-20 bg-white border-b border-b-zinc-200 fixed'>
			{children}
		</div>
    )
}