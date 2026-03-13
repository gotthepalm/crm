import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@/src/css/index.css';
import React from 'react';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '../../i18n/routing';

const roboto = Roboto({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Bloom CRM',
	description: 'Crm by gotthepalm & oladok-sites',
	icons: {
		icon: [
			{ url: '/favicons/favicon.ico' },
			{ url: '/favicons/favicon-16x16.png', sizes: '16x16' },
			{ url: '/favicons/favicon-32x32.png', sizes: '32x32' },
		],
		apple: '/favicon/apple-touch-icon.png',
	},
};

export default async function LocaleLayout({children, params}: {
	children: React.ReactNode;
	params: Promise<{locale: string}>;
}) {
	// Ensure that the incoming `locale` is valid
	const {locale} = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}
	return (
		<html lang='en'>
		<body className={`${roboto.className} text-[20px] bg-white min-h-screen flex flex-col`}><NextIntlClientProvider>{children}</NextIntlClientProvider></body>
		</html>

	);

	// ...
}