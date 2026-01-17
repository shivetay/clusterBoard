'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal, useNavigation } from '@/providers';
import {
  MenuButton,
  MobileMenuContainer,
  NavLinkContainer,
} from './menu.styled';
import { MENU_ITEM_LIST } from './menu-utils';

export function MobileMenu() {
  const { setIsOpen } = useModal();
  const { setActiveElement, isItemActive, menuItems, pathname } =
    useNavigation();
  const { t } = useTranslation();

  // Extract project ID from pathname for dynamic routes
  const currentProjectId = useMemo(() => {
    const projectIdMatch = pathname.match(/^\/project\/([^/]+)/);
    return projectIdMatch ? projectIdMatch[1] : null;
  }, [pathname]);

  const filteredMenuItems = useMemo(
    () =>
      MENU_ITEM_LIST.filter((item) =>
        Array.isArray(item.type)
          ? item.type.includes(menuItems)
          : item.type === menuItems,
      ).map((item) => {
        // Replace [id] placeholder with actual project ID for project-specific routes
        const href =
          currentProjectId && item.href.includes('[id]')
            ? item.href.replace('[id]', currentProjectId)
            : item.href;
        return { ...item, href };
      }),
    [menuItems, currentProjectId],
  );

  const handleMenuItemClick = (itemId: string) => {
    setActiveElement(itemId);
    setIsOpen(false);
  };

  return (
    <MobileMenuContainer>
      {filteredMenuItems.map((item) => {
        // Skip rendering links that still have [id] placeholder (no project ID available)
        if (item.href.includes('[id]')) {
          return null;
        }

        const isActive = isItemActive(item.href);

        return (
          <NavLinkContainer key={item.id} href={item.href}>
            <MenuButton
              onClick={() => {
                handleMenuItemClick(item.id);
              }}
              active={isActive}
              startIcon={item.icon}
              key={item.id}
            >
              {t(item.label)}
            </MenuButton>
          </NavLinkContainer>
        );
      })}
    </MobileMenuContainer>
  );
}

export default MobileMenu;
