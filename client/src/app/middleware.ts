import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const secret = process.env['NEXTAUTH_SECRET'];
  // secretが undefined の場合のフォールバック処理
  if (!secret) {
    console.error('Missing NEXTAUTH_SECRET');
    return NextResponse.redirect(new URL('/error', request.url));
  }
  const token = await getToken({ req: request, secret: secret });

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/ideas/new'],
};
