import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define the routes you want to exclude from authentication (public routes)
const isPublicRoute = createRouteMatcher([
  '/',                  // Public home page
  '/question/:id',      // Public question details
  '/tags',              // Public tags page
  '/tags/:id',          // Public tag details
  '/profile/:id',       // Public user profile
  '/community',         // Public community page
  '/jobs',              // Public jobs page
  '/api/webhook',       // Public webhook route
  '/api/webhook/clerk', // Public clerk webhook route
  '/sign-in',           // Public sign-in route
  '/sign-up',           // Public sign-up route
])

// Define the routes that need to be protected (authenticated routes)
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',     // Protect everything under /dashboard
  '/forum(.*)',         // Protect everything under /forum
])

export default clerkMiddleware(async (auth, req) => {
  // If it's a public route, no protection is needed
  if (isPublicRoute(req)) return

  // If it's a protected route, apply authentication
  if (isProtectedRoute(req)) {
    await auth.protect()  // Protect the route, requiring authentication
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
