'use client';
import { useTranslation } from 'react-i18next';
import { PageHeaderStyled } from './page-header.styled';

export function PageHeader({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <PageHeaderStyled variant="h2" as="h2">
      {t(title)}
    </PageHeaderStyled>
  );
}
