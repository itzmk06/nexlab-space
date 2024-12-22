import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  ignoredRoutes: ["/api/webhook", "/api/chatgpt"], // Ensure this includes webhook and chatgpt routes
  publicRoutes: [
    "/", // other public routes
    "/question/:id",
    "/tags",
    "/tags/:id",
    "/profile/:id",
    "/community",
    "/jobs",
    "/api/webhook", // webhook route
    '/api/webhook/clerk',
    '/sign-in',
    '/sign-up'
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
