'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

interface NavigationContextType {
  activeElement: string | null;
  setActiveElement: (element: string | null) => void;
  isItemActive: (href: string) => boolean;
  pathname: string;
}

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

/**
 * Helper function to check if a pathname matches a menu item href
 */
function isPathnameMatchingHref(pathname: string, href: string): boolean {
  // Exact match for paths like /cluster, /projects
  if (pathname === href) {
    return true;
  }
  // Check if pathname starts with the item href + '/' (for nested routes)
  if (pathname.startsWith(href + '/')) {
    return true;
  }
  // Special case: /project/[id] routes should match /projects menu item
  if (href === '/projects' && pathname.startsWith('/project/')) {
    return true;
  }
  return false;
}

export function NavigationProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const pathname = usePathname();

  const handleSetActiveElement = (element: string | null) => {
    setActiveElement(element);
  };

  const isItemActive = useCallback(
    (href: string): boolean => {
      return isPathnameMatchingHref(pathname, href);
    },
    [pathname],
  );

  return (
    <NavigationContext.Provider
      value={{
        activeElement,
        setActiveElement: handleSetActiveElement,
        isItemActive,
        pathname,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
