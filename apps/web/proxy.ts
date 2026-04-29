

import { NextRequest, NextResponse } from 'next/server'

const proxy = (req: NextRequest) => {
    const { pathname } = req.nextUrl

    const adminToken = req.cookies.get("USER")?.value
    const employeeToken = req.cookies.get("EMPLOYEE")?.value

    if (pathname.startsWith("/admin") && !adminToken) {
        return NextResponse.redirect(new URL("/signin", req.url))
    }
    if (pathname.startsWith("/employee") && !employeeToken) {
        return NextResponse.redirect(new URL("/signin", req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/employee/:path*"]
}
export default proxy