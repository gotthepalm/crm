"use client";

import {useRouter, usePathname} from "../i18n/navigation";
import { useTranslations } from 'use-intl';

export default function LanguageSwitcher() {
	const router = useRouter();
	const pathname = usePathname();
	
	const t = useTranslations("LanguageSwitcher")

	function changeLanguage(locale: string) {
		router.replace(pathname, {locale});
	}

	return (
		<div className="flex items-center">
			<button className="hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 rounded-md cursor-pointer component-transition" onClick={() => changeLanguage("en")}>{t('EN')}</button>
			|
			<button className="hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 rounded-md cursor-pointer component-transition" onClick={() => changeLanguage("uk")}>{t('UK')}</button>
		</div>
	);
}