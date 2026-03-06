-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "VacancyStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'PAUSED', 'CLOSED');

-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('NEW', 'SCREENING', 'INTERVIEW', 'TECH_INTERVIEW', 'OFFER', 'HIRED', 'REJECTED');

-- CreateTable
CREATE TABLE "UserCrm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserCrm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "salaryExpectationBottom" INTEGER,
    "salaryExpectationTop" INTEGER,
    "experienceYears" INTEGER,
    "status" "CandidateStatus" NOT NULL,
    "resumeUrl" TEXT,
    "linkedinUrl" TEXT,
    "gitHubUrl" TEXT,
    "portfolioUrl" TEXT,
    "note" TEXT,
    "vacancyId" INTEGER,
    "userCrmId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "employmentType" "EmploymentType",
    "salaryFrom" INTEGER,
    "salaryTo" INTEGER,
    "currency" TEXT,
    "experienceYears" INTEGER,
    "status" "VacancyStatus" NOT NULL,
    "userCrmId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "note" TEXT,
    "userCrmId" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "vacancyId" INTEGER NOT NULL,
    "userCrmId" TEXT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCrm_userId_key" ON "UserCrm"("userId");

-- AddForeignKey
ALTER TABLE "UserCrm" ADD CONSTRAINT "UserCrm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_userCrmId_fkey" FOREIGN KEY ("userCrmId") REFERENCES "UserCrm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_userCrmId_fkey" FOREIGN KEY ("userCrmId") REFERENCES "UserCrm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_userCrmId_fkey" FOREIGN KEY ("userCrmId") REFERENCES "UserCrm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_userCrmId_fkey" FOREIGN KEY ("userCrmId") REFERENCES "UserCrm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
