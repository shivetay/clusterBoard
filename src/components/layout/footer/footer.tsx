'use client';
import { useTranslation } from 'react-i18next';
import { FooterContact, FooterContainer, FooterContent } from './footer.styled';

export function Footer() {
  const { t } = useTranslation();
  return (
    <FooterContainer>
      <FooterContent>
        <span>
          {t('FOOTER_PRIVACY_POLICY')} | {t('FOOTER_COOKIES')} |
          {t('FOOTER_TERMS_OF_USE')}
        </span>
        <span> &copy; 2025 Cluster Board Łukasz Dawidowicz</span>
      </FooterContent>
      <FooterContact>
        <span>kontakt: </span>
        <span>mail: example@example.com</span>
        <span>discord: ikona diskord</span>
      </FooterContact>
    </FooterContainer>
  );
}

export default Footer;
