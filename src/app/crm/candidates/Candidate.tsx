import { CandidateModel } from '@/src/generated/prisma/models/Candidate';

export default function Candidate({ candidate }: { candidate: CandidateModel }) {
	function handleStatus() {
		switch (candidate.status) {
			case 'NEW' : return 'bg-blue-100 text-blue-700'
			case 'SCREENING': return 'bg-teal-100 text-teal-700'
			case 'OFFER': return 'bg-yellow-100 text-yellow-700'
			case 'INTERVIEW': return 'bg-lime-100 text-lime-700'
			case 'TECH_INTERVIEW': return 'bg-lime-100 text-lime-700'
			case 'HIRED': return 'bg-green-100 text-green-700'
			case 'REJECTED': return 'bg-red-100 text-red-700'
		}
	}
	return (
		<div className='bg-white flex flex-col rounded-2xl overflow-hidden border border-zinc-300 p-5 w-full max-w-xl transition'>
			<div className='flex justify-between items-start mb-5'>
				<div className='space-y-2'>
					<h3 className='text-[24px] font-semibold'>{candidate.name}</h3>
					{candidate.position && <p className='text-[16px] text-black'>{candidate.position}</p>}
				</div>

				<span className={`text-sm font-medium px-3 py-1 rounded-full ${handleStatus()}`}>{candidate.status}</span>
			</div>
			<div className='space-y-2 text-[16px] text-gray-700 mb-4'>
				{candidate.email && <p>📧 {candidate.email}</p>}
				{candidate.phone && <p>📞 {candidate.phone}</p>}
				{candidate.location && <p>📍 {candidate.location}</p>}
			</div>
			<div className='flex gap-6 text-[16px] mb-4'>
				{candidate.experienceYears && (
					<p>
						<span className='font-medium'>Experience:</span> {candidate.experienceYears} years
					</p>
				)}

				{(candidate.salaryExpectationBottom || candidate.salaryExpectationTop) && (
					<p>
						<span className='font-medium'>Salary:</span> {candidate.salaryExpectationBottom ?? '?'}
						{' - '}
						{candidate.salaryExpectationTop ?? '?'} $
					</p>
				)}
			</div>
			<div className='grid grid-cols-2 text-[16px] mb-4'>
					{candidate.resumeUrl && (
						<a href={candidate.resumeUrl} className='flex gap-2 items-center hover:underline'>
							<div className='h-5 w-5 bg-[url(/images/resume.svg)] bg-center bg-contain'></div>
							Resume
						</a>
					)}
					{candidate.portfolioUrl && (
						<a href={candidate.portfolioUrl} className='flex gap-2 items-center hover:underline'>
							<div className='h-5 w-5 bg-[url(/images/portfolio.svg)] bg-center bg-contain'></div>
							Portfolio
						</a>
					)}
					{candidate.gitHubUrl && (
						<a href={candidate.gitHubUrl} className='flex gap-2 items-center hover:underline'>
							<div className='h-5 w-5 bg-[url(/images/github.svg)] bg-center bg-contain'></div>
							GitHub
						</a>
					)}
					{candidate.linkedinUrl && (
						<a href={candidate.linkedinUrl} className='flex gap-2 items-center hover:underline'>
							<div className='h-5 w-5 bg-[url(/images/linkedin.svg)] bg-center bg-contain'></div>
							LinkedIn
						</a>
					)}
			</div>
			{candidate.note && <p className='text-sm text-gray-600 border-t pt-3'>{candidate.note}</p>}
		</div>
	);
}
