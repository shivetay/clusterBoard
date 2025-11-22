'use client';
import { SignedIn, UserButton } from '@clerk/nextjs';
import LoginBar from './loginbar';
import { NavbarContainer } from './navbar.styled';
// import { UserBar } from './userbar';

export function Navbar() {
  return (
    <NavbarContainer>
      <LoginBar />
      {/* <UserBar /> */}

      <SignedIn>
        <UserButton />
      </SignedIn>
    </NavbarContainer>
  );
}

export default Navbar;
