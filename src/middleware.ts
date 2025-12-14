import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes (accessible to everyone)
const isPublicRoute = createRouteMatcher([
  '/',
]);

// Define auth routes (only for unauthenticated users)
const isAuthRoute = createRouteMatcher([
  '/auth/sign-in(.*)',
  '/auth/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If user is authenticated and tries to access auth pages, redirect to dashboard
  if (userId && isAuthRoute(req)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If user is unauthenticated and tries to access protected routes
  if (!userId && !isPublicRoute(req) && !isAuthRoute(req)) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  // Protect all routes except public and auth routes
  if (!isPublicRoute(req) && !isAuthRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};