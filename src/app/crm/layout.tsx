import Sidebar from './Sidebar';
import React from 'react';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex flex-1'>
				<Sidebar />
				<div className='flex-1 bg-gray-100 ml-60'>{children}</div>
			</main>
		</div>
	);
}
