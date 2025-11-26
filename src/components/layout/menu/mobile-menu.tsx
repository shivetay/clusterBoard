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

type TMobileMenuProps = {
  items: 'cluster' | 'projects';
};

export function MobileMenu(props: TMobileMenuProps) {
  const { items } = props;
  const { setIsOpen } = useModal();
  const { setActiveElement } = useNavigation();
  const { isItemActive } = useNavigation();
  const { t } = useTranslation();

  const menuItems = useMemo(
    () =>
      MENU_ITEM_LIST.filter((item) =>
        Array.isArray(item.type)
          ? item.type.includes(items)
          : item.type === items,
      ),
    [items],
  );

  const handleMenuItemClick = (itemId: string) => {
    setActiveElement(itemId);
    setIsOpen(false);
  };

  return (
    <MobileMenuContainer>
      {menuItems.map((item) => {
        const isActive = isItemActive(item.href);

        return (
          <NavLinkContainer key={item.id} href={item.href}>
            <MenuButton
              onClick={() => handleMenuItemClick(item.id)}
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
