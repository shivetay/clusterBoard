'use client';
import { SignedIn, UserButton } from '@clerk/nextjs';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useEffect } from 'react';
import { CustomButton } from '@/components/ui';
import { useIsMobile } from '@/lib';
import { useModal } from '@/providers';
import { MobileMenu } from '../menu';
import LoginBar from './loginbar';
import { NavbarContainer } from './navbar.styled';

export function Navbar() {
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
      <SignedIn>
        {isMobile && (
          <CustomButton>
            <MenuOutlinedIcon onClick={handleMobileMenuOpen} />
          </CustomButton>
        )}
        <UserButton />
      </SignedIn>
    </NavbarContainer>
  );
}

export default Navbar;
