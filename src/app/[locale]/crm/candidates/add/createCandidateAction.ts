'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { CandidateStatus } from '@/src/generated/prisma/enums'

function str(value: FormDataEntryValue | null) {
	const v = value?.toString().trim()
	return v || undefined
}
function num(value: FormDataEntryValue | null) {
	const v = value?.toString().trim()
	return v ? Number(v) : undefined
}
function isCandidateStatus(value: string): value is CandidateStatus {
	return Object.values(CandidateStatus).includes(value as CandidateStatus)
}

export async function createCandidate(formData: FormData) {
	const session = await auth()
	if (!session?.user) {
		return { result: 'no-session' }
	}
	const name = str(formData.get('name'))
	const status = str(formData.get('status'))
	if (!name) {
		return { result: 'name-required' }
	}
	if (!status || !isCandidateStatus(status)) {
		return { result: 'invalid-status' }
	}

	await prisma.candidate.create({
		data: {
			name,
			status,
			userCrm: {
				connect: { userId: session.user.id }
			},

			phone: str(formData.get('phone')),
			email: str(formData.get('email')),
			position: str(formData.get('position')),
			location: str(formData.get('location')),
			experienceYears: num(formData.get('experience')),
			salaryExpectationBottom: num(formData.get('salaryExpectationBottom')),
			salaryExpectationTop: num(formData.get('salaryExpectationTop')),
			resumeUrl: str(formData.get('resumeUrl')),
			linkedinUrl: str(formData.get('linkedinUrl')),
			gitHubUrl: str(formData.get('githubUrl')),
			portfolioUrl: str(formData.get('portfolioUrl')),
			note: str(formData.get('note'))
		}
	})

	return { result: 'success' }
}