'use client';
import { usePathname } from 'next/navigation';
import { Menu } from '@/components';

export default function ClusterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const menuItems = pathname.includes('/project/') ? 'projects' : 'cluster';

  return (
    <>
      <Menu items={menuItems} />
      {children}
    </>
  );
}
