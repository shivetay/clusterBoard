'use client';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type TInnerContainerProps = {
  children: React.ReactNode;
  pageTitle: string;
};

export function InnerContainer({ children, pageTitle }: TInnerContainerProps) {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 3, borderRadius: '2px' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t(pageTitle)}
      </Typography>
      {children}
    </Box>
  );
}

export default InnerContainer;
