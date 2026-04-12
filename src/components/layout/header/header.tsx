import { Navbar } from '../navbar';
import { HeaderContainer } from './header.styled';

type HeaderProps = {
  showAuthLinks?: boolean;
};

export function Header({ showAuthLinks = false }: HeaderProps) {
  return (
    <HeaderContainer>
      <Navbar showAuthLinks={showAuthLinks} />
    </HeaderContainer>
  );
}

export default Header;
