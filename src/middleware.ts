import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    console.log('MiddleWare Test');

}
export const config = {
    matcher: [
        '/confirmation/:path*',
        '/payment/:path*',
        '/history/:path*'
    ]
}