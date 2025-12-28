'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

interface NavigationContextType {
  activeElement: string | null;
  setActiveElement: (element: string | null) => void;
  isItemActive: (href: string) => boolean;
  pathname: string;
  menuItems: 'cluster' | 'projects';
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
  // This handles routes like /project/[id]/invitations matching /project/[id]/invitations
  if (pathname.startsWith(href + '/')) {
    return true;
  }

  // Special case: /project/[id] routes should match /projects menu item
  // But exclude more specific routes like /project/[id]/invitations that have their own menu items
  if (href === '/projects' && pathname.startsWith('/project/')) {
    // Don't match if we're on a specific project sub-route that has its own menu item
    // These routes should be handled by their specific menu items, not the /projects item
    const specificSubRoutes = [
      'invitations',
      'files',
      'inspirations',
      'wiadomoscie',
    ];
    const pathParts = pathname.split('/');
    const MIN_PATH_PARTS_FOR_SUB_ROUTE = 4; // /project/[id]/[subroute] = 4 parts
    const SUB_ROUTE_INDEX = 3; // Index of sub-route in path parts array
    // Check if we're on a sub-route (e.g., /project/123/invitations has 4 parts)
    if (
      pathParts.length >= MIN_PATH_PARTS_FOR_SUB_ROUTE &&
      specificSubRoutes.includes(pathParts[SUB_ROUTE_INDEX])
    ) {
      return false;
    }
    return true;
  }
  return false;
}

export function NavigationProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const pathname = usePathname();
  const menuItems = pathname.includes('/project/') ? 'projects' : 'cluster';

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
        menuItems,
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
