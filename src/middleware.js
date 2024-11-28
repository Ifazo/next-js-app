import { withAuth } from "next-auth/middleware"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        return req.token
    },
    {
        callbacks: {
            authorized: ({ token }) => token,
        },
        pages: {
            signIn: "/auth/signin",
            signOut: "/",
        },
    }
)

export const config = { matcher: ["/builder"] }