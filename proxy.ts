import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon|sitemap|manifest|robots|images|icons|.well-known|sw|_next/image|.*\\.json$|.*\\.png$|.*\\.ico$|.*\\.jpg$|.*\\.svg$|.*\\.webp$|.*\\.jpeg$).*)",
  ],
};
