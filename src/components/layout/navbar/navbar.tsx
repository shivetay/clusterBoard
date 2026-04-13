'use client';
import { Show, UserButton } from '@clerk/nextjs';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Link from 'next/link';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/components/ui';
import { useIsMobile } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import { MobileMenu } from '../menu';
import LoginBar from './loginbar';
import { NavbarContainer } from './navbar.styled';
import { NotificationsMenu } from './notifications';

export function Navbar() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { setModalContent, setShowCloseButton } = useModal();

  useEffect(() => {
    setShowCloseButton(false);
  }, [setShowCloseButton]);

  const handleMobileMenuOpen = () => {
    setModalContent(<MobileMenu />);
  };

  return (
    <NavbarContainer>
      <LoginBar />
      <Show when="signed-in">
        <Link href="/cluster">
          <CustomButton color="primary" variant="contained">
            {t(TRANSLATIONS.CLUSTER_BOARD)}
          </CustomButton>
        </Link>
        {isMobile && (
          <CustomButton>
            <MenuOutlinedIcon onClick={handleMobileMenuOpen} />
          </CustomButton>
        )}
        <NotificationsMenu />
        <UserButton />
      </Show>
    </NavbarContainer>
  );
}

export default Navbar;
