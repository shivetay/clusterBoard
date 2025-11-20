import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/jwt';

/**
 * GET /api/auth/session
 * Get current user session
 */
export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'No active session',
        },
        { status: 401 },
      );
    }

    // Verify token
    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid or expired session',
        },
        { status: 401 },
      );
    }

    // TODO: Fetch user from database
    // const user = await db.user.findUnique({
    //   where: { id: payload.userId },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //     role: true,
    //     cluster_projects: true,
    //     projects_limit: true,
    //   },
    // });

    // MOCK: Return user data
    const mockUser = {
      id: payload.userId,
      name: 'Test User',
      email: payload.email,
      role: payload.role,
      cluster_projects: [],
      projects_limit: 5,
    };

    return NextResponse.json(
      {
        success: true,
        user: mockUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
