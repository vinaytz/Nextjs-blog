import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    console.log("Middleware hit! 🔥", req.nextUrl.pathname)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // return true if user is authenticated
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/createPost", "/deletePost", "/EditPost"],
}
