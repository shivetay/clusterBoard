import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth/userService';
import { HttpError } from '@/lib/errors';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const user = await registerUser(payload);

    return NextResponse.json(
      {
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { message: 'Unable to register user.' },
      { status: 500 },
    );
  }
}
