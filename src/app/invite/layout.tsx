import type { Metadata } from 'next';
import { privateAppMetadata } from '@/lib/seo';

export const metadata: Metadata = privateAppMetadata;

export default function InviteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
