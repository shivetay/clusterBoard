import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createAccessToken } from '@/lib/auth/tokens';
import { validateCredentials } from '@/lib/auth/userService';
import { HttpError } from '@/lib/errors';

const TOKEN_COOKIE = 'clusterboard.at';
const SECONDS_PER_MINUTE = 60;
const FIFTEEN_MINUTES = 15;
const FIFTEEN_MINUTES_IN_SECONDS = FIFTEEN_MINUTES * SECONDS_PER_MINUTE;

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const user = await validateCredentials(payload);
    const accessToken = await createAccessToken(user);

    const response = NextResponse.json(
      {
        user,
        accessToken,
      },
      { status: 200 },
    );

    cookies().set({
      name: TOKEN_COOKIE,
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: FIFTEEN_MINUTES_IN_SECONDS,
      path: '/',
    });

    return response;
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { message: 'Unable to login user.' },
      { status: 500 },
    );
  }
}
