# Bloom CRM

Bloom CRM is a recruitment CRM built on Next.js App Router. The project provides authenticated access to a private workspace for managing candidates, vacancies, meetings, and sourcing channels.

## What the project does

- OAuth sign-in via Google and GitHub
- Private CRM area for authenticated users
- Candidate management
- Vacancy management
- Meeting/interview management
- Source management
- English and Ukrainian localization with `next-intl`
- PostgreSQL persistence through Prisma

When a new user signs in for the first time, the app automatically creates a linked `UserCrm` workspace record.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma 7
- PostgreSQL
- Auth.js / NextAuth v5 beta
- `next-intl`

## Project structure

```text
src/
  app/
    api/auth/[...nextauth]/   Auth.js route handlers
    [locale]/                 localized public and CRM routes
  components/                 shared UI components
  i18n/                       locale routing and navigation config
lib/
  prisma.ts                   Prisma client initialization
prisma/
  schema.prisma               database schema
  migrations/                 Prisma migrations
public/
  messages/                   translation files
  images/                     static assets
auth.ts                       Auth.js configuration
```

## Main routes

- `/` landing page
- `/login` login page
- `/crm/candidates` candidates list
- `/crm/vacancies` vacancies list
- `/crm/meetings` meetings list
- `/crm/sources` sources list
- `/crm/settings` settings page

Localization is configured for:

- `en`
- `uk`

Default locale is `en`, with `as-needed` locale prefix behavior.

## Environment variables

Create a local env file such as `.env.local` or `.env` and define:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME
BETTER_AUTH_SECRET=your-long-random-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
```

Notes:

- `DATABASE_URL` is required by Prisma and the Prisma PostgreSQL adapter.
- `BETTER_AUTH_SECRET` is used as the Auth.js secret in `auth.ts`.
- Google and GitHub providers are enabled in code, so their credentials must be configured for login to work.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables.

3. Generate the Prisma client:

```bash
npx prisma generate
```

4. Apply migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Database

The Prisma schema includes:

- Auth.js models: `User`, `Account`, `Session`, `VerificationToken`, `Authenticator`
- CRM models: `UserCrm`, `Candidate`, `Vacancy`, `Source`, `Meeting`

Core enums:

- `EmploymentType`
- `VacancyStatus`
- `CandidateStatus`
- `InterviewType`

Prisma client output is generated into:

```text
src/generated/prisma
```

## Authentication

Authentication is configured in `auth.ts` using:

- `@auth/prisma-adapter`
- Google provider
- GitHub provider

The route handler is exposed at:

```text
src/app/api/auth/[...nextauth]/route.ts
```

## Internationalization

Translations are stored in:

```text
public/messages/en
public/messages/uk
```

Routing is configured in:

```text
src/i18n/routing.ts
```

## Build and production

Production build:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Before deploying, make sure:

- PostgreSQL is reachable from the deployment environment
- all OAuth callback URLs are configured correctly
- required env variables are present
- Prisma migrations have been applied
