import User from "@/models/userModel"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = User.findOne({ email: credentials.email })

                if (user) {
                    return user
                }
                return null
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // console.log('jwt', token, account)
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // console.log('session', session, token, user)
            session.accessToken = token.accessToken
            return session
        }
    },
    // jwt: {
    //     async encode({ secret, token }) {
    //         return jwt.sign(token, secret)
    //     },
    //     async decode({ secret, token }) {
    //         return jwt.verify(token, secret)
    //     },
    // },
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)