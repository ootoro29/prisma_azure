import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { pool } from "./db";
import { PrismaClient } from "@prisma/client";
//import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma || new PrismaClient();

export const NAuth = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google({
        clientId:process.env.AUTH_GOOGLE_ID,
        clientSecret:process.env.AUTH_GOOGLE_SECRET
    })],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        authorized({request,auth}) {
            try {
                const { pathname } = request.nextUrl;
                if (pathname === "/main") return !!auth; //ログインしているユーザーだけ見れるページだよ。
                return true; //ログインしてなくても取りあえず全ページ見れるよ。
            } catch (err) {
                console.log(err);
            }
        },
        jwt({ token, trigger, session }) {
            if (trigger === "update") token.name = session.user.name;
            return token;
        },
    },
})

export const { handlers, auth, signIn, signOut } = NAuth;
//const adapter = new PrismaPg(pool);
//export const prisma = new PrismaClient({adapter});