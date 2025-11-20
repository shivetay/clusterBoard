import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { loginSchema } from '@/lib/validations/auth.validation';
import { verifyPassword } from '@/lib/auth/password';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth/jwt';

/**
 * POST /api/auth/login
 * Authenticate user and return tokens
 *
 * This is a MOCK implementation. In production, you would:
 * 1. Connect to your database
 * 2. Find the user by email
 * 3. Verify password
 * 4. Generate and return tokens
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = loginSchema.safeParse(body);
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

    const { email, password } = validationResult.data;

    // TODO: Find user in database
    // const user = await db.user.findUnique({
    //   where: { email },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //     password: true,
    //     role: true,
    //     cluster_projects: true,
    //     projects_limit: true,
    //   },
    // });

    // MOCK: Simulate database user (for demo purposes)
    // In production, this should come from your database
    const mockUser = {
      id: '6919058568c55331a48e4314',
      name: 'Test User',
      email: 'test@example.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYKVKUjVqU6', // password: "Test1234!"
      role: 'user',
      cluster_projects: [],
      projects_limit: 5,
    };

    // Check if user exists (in real app, check database)
    if (email !== mockUser.email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid credentials',
        },
        { status: 401 },
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, mockUser.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid credentials',
        },
        { status: 401 },
      );
    }

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

    // Prepare user data (without password)
    const { password: _, ...userWithoutPassword } = mockUser;

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: userWithoutPassword,
        token: accessToken,
      },
      { status: 200 },
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
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
