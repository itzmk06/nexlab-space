import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define all routes as public
const isPublicRoute = createRouteMatcher([
  '/(.*)',                  // Home
  '/community',         // Community
  '/collection',        // Collections
  '/tags',              // Tags
  '/profile/:id',       // Profile
  '/jobs',
  '/feed',
  '/feed/:id',              // Projects
  '/api/webhook',       // Webhook
  '/api/webhook/clerk', // Clerk webhook
  '/sign-in(.*)',       // Sign-in (catch-all route)
  '/sign-up(.*)',       // Sign-up (catch-all route)
  '/question/:id',      // Question details
  '/tags/:id',          // Tag details
]);

export default clerkMiddleware(async (auth, req) => {
  // If it's a public route, no protection is needed
  if (isPublicRoute(req)) return;

  // If it's a protected route, apply authentication
  await auth.protect();  // Protect the route, requiring authentication
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
