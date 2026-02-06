import { auth } from '@clerk/nextjs/server';
import { type NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * GET /api/file/[fileId]
 * Proxies file binary from backend with auth. Use as img src for MongoDB-stored images.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ fileId: string }> },
) {
  try {
    const { fileId } = await context.params;
    if (!fileId) {
      return NextResponse.json({ error: 'Missing fileId' }, { status: 400 });
    }

    const { getToken } = await auth();
    const token = await getToken();
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = `${API_BASE}/files/${fileId}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: text || 'File not found' },
        { status: res.status },
      );
    }

    const contentType =
      res.headers.get('Content-Type') ?? 'application/octet-stream';
    const contentLength = res.headers.get('Content-Length');
    const body = await res.arrayBuffer();

    const response = new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Inline so images display in browser instead of triggering download
        'Content-Disposition': 'inline',
        ...(contentLength && { 'Content-Length': contentLength }),
      },
    });

    return response;
  } catch (error) {
    console.error('[api/file]', error);
    return NextResponse.json(
      { error: 'Failed to fetch file' },
      { status: 500 },
    );
  }
}
