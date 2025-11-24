'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuButton, MenuContainer } from './menu.styled';
import { MENU_ITEM_LIST } from './menu-utils';

type TMenuProps = {
  items: 'cluster' | 'projects';
};

export function Menu(props: TMenuProps) {
  const { items } = props;
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

  return (
    <MenuContainer>
      {menuItems.map((item) => {
        return (
          <Link key={item.id} href={item.href}>
            <MenuButton key={item.id}>{t(item.label)}</MenuButton>
          </Link>
        );
      })}
    </MenuContainer>
  );
}

export default Menu;
