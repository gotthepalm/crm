import NextAuth from "next-auth"
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [Google, GitHub],
	secret: process.env.BETTER_AUTH_SECRET,
	events: {
		async createUser({user}) {
			await prisma.userCrm.create({
				data: {
					user: {
						connect: {id: user.id}
					}
				}
			})
		}
	}
})