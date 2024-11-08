import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_ACCOUNT_GUEST, GUEST_LIST_ACCOUNT } from "./lib/constants";
import { getRandomNumber } from "./lib/utils";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_ACCESS_TOKEN_KEY)?.value;
  const accountGuestInfo = request.cookies.has(COOKIE_ACCOUNT_GUEST);
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  requestHeaders.set("x-next-url", request.url);
  requestHeaders.set("x-origin", origin);
  requestHeaders.set("x-pathname", pathname);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (!accessToken) {
    if (!accountGuestInfo) {
      //SET INFO ACCOUNT GUEST
      const randomNumber = getRandomNumber(1, 30);
      const stringParseInfoGuest = JSON.stringify(GUEST_LIST_ACCOUNT[randomNumber]);
      response.cookies.set(COOKIE_ACCOUNT_GUEST, stringParseInfoGuest, {
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
      })
    }
    //HANDLE NOT LOGIN
  }
  return response;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|landingpage).*)",
};
