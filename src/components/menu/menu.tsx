'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../button';
import { MenuContainer } from './menu.styled';

type TMenuItem = {
  id: string;
  href: string;
  label: string;
};

type TMenuProps = {
  items: TMenuItem[];
};

export function Menu(props: TMenuProps) {
  const { items } = props;
  const { t } = useTranslation();

  return (
    <MenuContainer>
      {items.map((item) => {
        return (
          <Link key={item.id} href={item.href}>
            <CustomButton key={item.id}>{t(item.label)}</CustomButton>
          </Link>
        );
      })}
    </MenuContainer>
  );
}

export default Menu;
