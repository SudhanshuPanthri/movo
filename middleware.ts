import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req:NextRequest){
    const {cookies} = req.headers;
    const token=cookies['auth-token'];

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try{
        jwt.verify(token, process.env.JWT_SECRET as string);
        return NextResponse.next();
    }
    catch(error){
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: ['/protected-route/:path*'],
};