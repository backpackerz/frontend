import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(
	request: NextRequest,
	event: NextFetchEvent,
): NextMiddlewareResult | Promise<NextMiddlewareResult> {
	const { pathname } = request.nextUrl;
	// Files and API calls
	if (pathname.includes(".") || pathname.startsWith("/api")) {
		return NextResponse.next();
	}
	const { name = "", params = {} } = request.page;
	const paramKeys = Array.from(name!.matchAll(/\[(.*?)]/g), (x) => x[1]);
	const hasMissingParam = paramKeys.some(
		(key) => !params.hasOwnProperty(key),
	);

	if (hasMissingParam) {
		return NextResponse.rewrite("/404");
	}

	return NextResponse.next();
}
