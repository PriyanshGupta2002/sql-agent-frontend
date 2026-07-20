// proxy.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

// No auth checks here — just keeps Clerk's auth context available.
// Add non-auth logic here later if needed (redirects, headers, geo-blocking, etc).
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
