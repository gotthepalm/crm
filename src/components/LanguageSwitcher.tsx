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
		<div className="flex gap-2 items-center">
			<button className="hover:text-black/60 hover:[text-shadow:0_0_8px_rgba(130,0,219,0.6)] component-transition" onClick={() => changeLanguage("en")}>{t('EN')}</button>
			|
			<button className="hover:text-black/60 hover:[text-shadow:0_0_8px_rgba(130,0,219,0.6)] component-transition" onClick={() => changeLanguage("uk")}>{t('UK')}</button>
		</div>
	);
}