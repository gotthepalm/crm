import type { Metadata } from 'next';
import '@/src/css/index.css';
import React from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({
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

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${inter.className} text-[20px] text-black dark:text-white bg-white dark:bg-black min-h-screen flex flex-col`}
			>
				<ThemeProvider attribute='class' defaultTheme='light'>
					<NextIntlClientProvider>{children}</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
