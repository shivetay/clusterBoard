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
  const { setActiveElement, isItemActive, menuItems } = useNavigation();
  const { t } = useTranslation();

  const filteredMenuItems = useMemo(
    () =>
      MENU_ITEM_LIST.filter((item) =>
        Array.isArray(item.type)
          ? item.type.includes(menuItems)
          : item.type === menuItems,
      ),
    [menuItems],
  );

  const handleMenuItemClick = (itemId: string) => {
    setActiveElement(itemId);
    setIsOpen(false);
  };

  return (
    <MobileMenuContainer>
      {filteredMenuItems.map((item) => {
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
