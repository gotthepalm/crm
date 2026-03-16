import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
// import en from "@/public/messages/"

export default getRequestConfig(async ({requestLocale}) => {
	const requested = await requestLocale;

	const locale = hasLocale(routing.locales, requested)
		? requested
		: routing.defaultLocale;

	const messages = {
		en: {
			mainPage: (await import('@/public/messages/en/mainPage.json')).default,
			footer: (await import('@/public/messages/en/footer.json')).default,
			LanguageSwitcher: (await import('@/public/messages/en/LanguageSwitcher.json')).default,
			CandidateCard: (await import('@/public/messages/en/crm/candidates/CandidateCard.json')).default,
			Candidates: (await import('@/public/messages/en/crm/candidates/Candidates.json')).default,
			AddCandidate: (await import('@/public/messages/en/crm/candidates/AddCandidate.json')).default,
			CreateCandidate: (await import('@/public/messages/en/crm/candidates/CreateCandidate.json')).default,
			AddVacancy: (await import('@/public/messages/en/crm/vacancies/AddVacancy.json')).default
		},
		uk: {
			mainPage: (await import('@/public/messages/uk/mainPage.json')).default,
			footer: (await import('@/public/messages/uk/footer.json')).default,
			LanguageSwitcher: (await import('@/public/messages/uk/LanguageSwitcher.json')).default,
			CandidateCard: (await import('@/public/messages/uk/crm/candidates/CandidateCard.json')).default,
			Candidates: (await import('@/public/messages/uk/crm/candidates/Candidates.json')).default,
			AddCandidate: (await import('@/public/messages/uk/crm/candidates/AddCandidate.json')).default,
			CreateCandidate: (await import('@/public/messages/uk/crm/candidates/CreateCandidate.json')).default,
			AddVacancy: (await import('@/public/messages/uk/crm/vacancies/AddVacancy.json')).default
		}
	};

	return {
		locale,
		messages: messages[locale]
	};
});
// import {getRequestConfig} from 'next-intl/server';
// import {hasLocale} from 'next-intl';
// import {routing} from './routing';
//
// export default getRequestConfig(async ({requestLocale}) => {
// 	// Typically corresponds to the `[locale]` segment
// 	const requested = await requestLocale;
// 	const locale = hasLocale(routing.locales, requested)
// 		? requested
// 		: routing.defaultLocale;
//
// 	return {
// 		locale,
// 		messages: (await import(`../../messages/${locale}/main.json`)).default
// 	};
// });