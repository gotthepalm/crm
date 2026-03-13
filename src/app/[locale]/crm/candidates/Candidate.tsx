import { CandidateModel } from '@/src/generated/prisma/models/Candidate';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function Candidate({ candidate }: { candidate: CandidateModel }) {
	const t = await getTranslations("CandidateCard")
	function handleStatus() {
		switch (candidate.status) {
			case 'NEW':
				return 'bg-blue-100 text-blue-700';
			case 'SCREENING':
				return 'bg-teal-100 text-teal-700';
			case 'OFFER':
				return 'bg-yellow-100 text-yellow-700';
			case 'INTERVIEW':
				return 'bg-lime-100 text-lime-700';
			case 'TECH_INTERVIEW':
				return 'bg-lime-100 text-lime-700';
			case 'HIRED':
				return 'bg-green-100 text-green-700';
			case 'REJECTED':
				return 'bg-red-100 text-red-700';
		}
	}
	return (
		<article className='bg-white flex flex-col rounded-2xl overflow-hidden border border-zinc-300 p-5 mb-5 w-full max-w-xl break-inside-avoid transition'>
			<div className='flex justify-between items-start mb-5'>
				<div className='space-y-2'>
					<h3 className='text-[24px] font-semibold'>{candidate.name}</h3>
					{candidate.position && <p className='text-[16px] text-black'>{candidate.position}</p>}
				</div>

				<span className={`text-sm font-medium px-3 py-1 rounded-full ${handleStatus()}`}>
					{t(`Status.${candidate.status}`)}
				</span>
			</div>
			<div className='space-y-2 text-[16px] text-gray-700 mb-4'>
				{candidate.email && (
					<p className='flex gap-2'>
						<Image src='/images/email.svg' width={25} height={25} alt='' />
						{candidate.email}
					</p>
				)}
				{candidate.phone && (
					<p className='flex gap-2'>
						<Image src='/images/phone.svg' width={25} height={25} alt='' />
						{candidate.phone}
					</p>
				)}
				{candidate.location && (
					<p className='flex gap-2'>
						<Image src='/images/location.svg' width={25} height={25} alt='' />
						{candidate.location}
					</p>
				)}
				{/*{candidate.phone && <p>📞 {candidate.phone}</p>}*/}
				{/*{candidate.location && <p>📍 {candidate.location}</p>}*/}
			</div>
			<div className='flex gap-6 text-[16px] mb-4'>
				{candidate.experienceYears && (
					<p>
						<span className='font-medium'>{t('Experience')}:</span> {candidate.experienceYears} {t('Years')}
					</p>
				)}

				{(candidate.salaryExpectationBottom || candidate.salaryExpectationTop) && (
					<p>
						<span className='font-medium'>{t('Salary')}:</span> {candidate.salaryExpectationBottom ?? '?'}
						{' - '}
						{candidate.salaryExpectationTop ?? '?'} $
					</p>
				)}
			</div>
			<div className='grid grid-cols-2 text-[16px] mb-4'>
				{candidate.resumeUrl && (
					<a href={candidate.resumeUrl} className='flex gap-2 items-center hover:underline'>
						<Image src='/images/resume.svg' width={25} height={25} alt='' />
						{t('Resume')}
					</a>
				)}
				{candidate.portfolioUrl && (
					<a href={candidate.portfolioUrl} className='flex gap-2 items-center hover:underline'>
						<Image src='/images/portfolio.svg' width={25} height={25} alt='' />
						{t("Portfolio")}
					</a>
				)}
				{candidate.gitHubUrl && (
					<a href={candidate.gitHubUrl} className='flex gap-2 items-center hover:underline'>
						<Image src='/images/github.svg' width={25} height={25} alt='' />
						GitHub
					</a>
				)}
				{candidate.linkedinUrl && (
					<a href={candidate.linkedinUrl} className='flex gap-2 items-center hover:underline'>
						<Image src='/images/linkedin.svg' width={25} height={25} alt='' />
						LinkedIn
					</a>
				)}
			</div>
			{candidate.note && <p className='flex-1 text-sm text-gray-600 border-t pt-3'>{candidate.note}</p>}
		</article>
	);
}
