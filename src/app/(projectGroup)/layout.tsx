import type { Metadata } from 'next';
import { Menu } from '@/components';
import { privateAppMetadata } from '@/lib/seo';

export const metadata: Metadata = privateAppMetadata;

export default function ClusterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Menu />
      {children}
    </>
  );
}
