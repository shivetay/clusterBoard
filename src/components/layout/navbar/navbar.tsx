'use client';
import { SignedIn, UserButton } from '@clerk/nextjs';
import LoginBar from './loginbar';
import { NavbarContainer } from './navbar.styled';

export function Navbar() {
  return (
    <NavbarContainer>
      <LoginBar />
      <SignedIn>
        <UserButton />
      </SignedIn>
    </NavbarContainer>
  );
}

export default Navbar;
