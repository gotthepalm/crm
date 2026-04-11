import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
	const requested = await requestLocale;

	const locale = hasLocale(routing.locales, requested)
		? requested
		: routing.defaultLocale;

	const messages = {
		en: {
			mainPage: (await import('@/public/messages/en/mainPage.json')).default,
			footer: (await import('@/public/messages/en/footer.json')).default,
			Sidebar: (await import('@/public/messages/en/crm/Sidebar.json')).default,
			LanguageSwitcher: (await import('@/public/messages/en/LanguageSwitcher.json')).default,
			Candidates: (await import('@/public/messages/en/crm/candidates/Candidates.json')).default,
			CandidateCard: (await import('@/public/messages/en/crm/candidates/CandidateCard.json')).default,
			AddCandidate: (await import('@/public/messages/en/crm/candidates/AddCandidate.json')).default,
			CreateCandidate: (await import('@/public/messages/en/crm/candidates/CreateCandidate.json')).default,
			Vacancies: (await import('@/public/messages/en/crm/vacancies/Vacancies.json')).default,
			VacancyCard: (await import('@/public/messages/en/crm/vacancies/VacancyCard.json')).default,
			AddVacancy: (await import('@/public/messages/en/crm/vacancies/AddVacancy.json')).default,
			CreateVacancy: (await import('@/public/messages/en/crm/vacancies/CreateVacancy.json')).default,
			Meetings: (await import('@/public/messages/en/crm/meetings/Meetings.json')).default,
			MeetingCard: (await import('@/public/messages/en/crm/meetings/MeetingCard.json')).default,
			AddMeeting: (await import('@/public/messages/en/crm/meetings/AddMeeting.json')).default,
			CreateMeeting: (await import('@/public/messages/en/crm/meetings/CreateMeeting.json')).default,
			AddSource: (await import('@/public/messages/en/crm/sources/AddSource.json')).default,
			CreateSource: (await import('@/public/messages/en/crm/sources/CreateSource.json')).default,
		},
		uk: {
			mainPage: (await import('@/public/messages/uk/mainPage.json')).default,
			footer: (await import('@/public/messages/uk/footer.json')).default,
			Sidebar: (await import('@/public/messages/uk/crm/Sidebar.json')).default,
			LanguageSwitcher: (await import('@/public/messages/uk/LanguageSwitcher.json')).default,
			Candidates: (await import('@/public/messages/uk/crm/candidates/Candidates.json')).default,
			CandidateCard: (await import('@/public/messages/uk/crm/candidates/CandidateCard.json')).default,
			AddCandidate: (await import('@/public/messages/uk/crm/candidates/AddCandidate.json')).default,
			CreateCandidate: (await import('@/public/messages/uk/crm/candidates/CreateCandidate.json')).default,
			Vacancies: (await import('@/public/messages/uk/crm/vacancies/Vacancies.json')).default,
			VacancyCard: (await import('@/public/messages/uk/crm/vacancies/VacancyCard.json')).default,
			AddVacancy: (await import('@/public/messages/uk/crm/vacancies/AddVacancy.json')).default,
			CreateVacancy: (await import('@/public/messages/uk/crm/vacancies/CreateVacancy.json')).default,
			Meetings: (await import('@/public/messages/uk/crm/meetings/Meetings.json')).default,
			MeetingCard: (await import('@/public/messages/uk/crm/meetings/MeetingCard.json')).default,
			AddMeeting: (await import('@/public/messages/uk/crm/meetings/AddMeeting.json')).default,
			CreateMeeting: (await import('@/public/messages/uk/crm/meetings/CreateMeeting.json')).default,
			AddSource: (await import('@/public/messages/uk/crm/sources/AddSource.json')).default,
			CreateSource: (await import('@/public/messages/uk/crm/sources/CreateSource.json')).default,
		}
	};

	return {
		locale,
		messages: messages[locale]
	};
});