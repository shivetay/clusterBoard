import { InfoBanner } from '@/components/features';
import { Navbar } from '../navbar';
import { HeaderContainer } from './header.styled';

export function Header() {
  return (
    <>
      <HeaderContainer>
        <Navbar />
      </HeaderContainer>
      <InfoBanner />
    </>
  );
}

export default Header;
