import Google from "next-auth/providers/google"
import Githhub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth";

export default{
    providers:[
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }),
        Githhub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        })
    ]   
} satisfies NextAuthConfig

