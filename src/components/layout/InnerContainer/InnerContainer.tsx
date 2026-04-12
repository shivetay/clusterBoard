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
    <Box
      sx={{
        mt: { xs: 2, sm: 3 },
        borderRadius: '2px',
        minWidth: 0,
      }}
    >
      <Typography
        variant="h4"
        sx={(theme) => ({
          mb: { xs: 1.5, sm: 2 },
          fontSize: {
            xs: theme.typography.h5.fontSize,
            sm: theme.typography.h4.fontSize,
          },
          lineHeight: {
            xs: theme.typography.h5.lineHeight,
            sm: theme.typography.h4.lineHeight,
          },
        })}
      >
        {t(pageTitle)}
      </Typography>
      {children}
    </Box>
  );
}

export default InnerContainer;
