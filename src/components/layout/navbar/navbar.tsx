import LoginBar from './loginbar';
import { NavbarContainer } from './navbar.styled';
import { UserBar } from './userbar';

export function Navbar() {
  return (
    <NavbarContainer>
      <LoginBar />
      <UserBar />
    </NavbarContainer>
  );
}

export default Navbar;
