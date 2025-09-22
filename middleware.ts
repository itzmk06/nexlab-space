import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublic = createRouteMatcher([
  '/',
  '/api/webhook',
  '/question(.*)',
  '/tags(.*)',
  '/profile(.*)',
  '/community',
  '/jobs'
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublic(req)) {
    auth.protect(); // redirect to sign-in if not authenticated
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)'
  ]
};
