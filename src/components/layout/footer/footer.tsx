'use client';
import { useTranslation } from 'react-i18next';
import {
  FooterContact,
  FooterContainer,
  FooterContent,
  FooterVersion,
} from './footer.styled';

type FooterProps = {
  apiVersion?: string | null;
};

export function Footer({ apiVersion }: FooterProps) {
  const { t } = useTranslation();
  const versionLabel =
    apiVersion != null && apiVersion.length > 0 ? apiVersion : '—';

  return (
    <FooterContainer>
      <FooterVersion>v{versionLabel}</FooterVersion>
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
