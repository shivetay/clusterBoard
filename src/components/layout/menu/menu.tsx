'use client';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@/providers';
import { MenuButton, MenuContainer, NavLinkContainer } from './menu.styled';
import { MENU_ITEM_LIST } from './menu-utils';

export function Menu() {
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

  // Set active element based on current pathname
  useEffect(() => {
    const activeItem = filteredMenuItems.find((item) =>
      isItemActive(item.href),
    );
    const newActiveId = activeItem?.id ?? null;
    setActiveElement(newActiveId);
  }, [filteredMenuItems, isItemActive, setActiveElement]);

  return (
    <MenuContainer>
      {filteredMenuItems.map((item) => {
        const isActive = isItemActive(item.href);

        return (
          <NavLinkContainer key={item.id} href={item.href}>
            <MenuButton
              onClick={() => setActiveElement(item.id)}
              active={isActive}
              startIcon={item.icon}
              key={item.id}
            >
              {t(item.label)}
            </MenuButton>
          </NavLinkContainer>
        );
      })}
    </MenuContainer>
  );
}

export default Menu;
