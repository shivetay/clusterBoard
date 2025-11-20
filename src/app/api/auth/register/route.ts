import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { registerSchema } from '@/lib/validations/auth.validation';
import { hashPassword } from '@/lib/auth/password';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth/jwt';

/**
 * POST /api/auth/register
 * Register a new user
 *
 * This is a MOCK implementation. In production, you would:
 * 1. Connect to your database
 * 2. Check if user already exists
 * 3. Create the user in the database
 * 4. Return appropriate tokens
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, password } = validationResult.data;

    // TODO: Check if user already exists in your database
    // const existingUser = await db.user.findUnique({ where: { email } });
    // if (existingUser) {
    //   return NextResponse.json(
    //     { success: false, message: 'User already exists' },
    //     { status: 409 }
    //   );
    // }

    // Hash password
    const _hashedPassword = await hashPassword(password);
    // In production, use: password: hashedPassword when creating user

    // TODO: Create user in database
    // const user = await db.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: hashedPassword,
    //     role: 'user',
    //   },
    // });

    // MOCK: Simulate user creation
    const mockUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      role: 'user',
      cluster_projects: [],
      projects_limit: 5,
    };

    // Generate tokens
    const accessToken = await generateAccessToken({
      userId: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
    });

    const refreshToken = await generateRefreshToken({
      userId: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
    });

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        user: mockUser,
        token: accessToken,
      },
      { status: 201 },
    );

    // Set secure HTTP-only cookies
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
