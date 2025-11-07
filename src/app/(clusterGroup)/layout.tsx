import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Menu } from '@/components';
import { TRANSLATIONS } from '@/locales';
import { I18nProvider } from '@/providers';
import { ThemeProvider } from '@/theme';
import { LayoutContainer } from '../layout.styled';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cluster Board',
  description: 'Cluster Board',
};

const MENU_ITEMS = [
  {
    id: 'projekty',
    href: '/projekty',
    label: TRANSLATIONS.PROJEKTY,
  },
  {
    id: 'zadania',
    href: '/zadania',
    label: TRANSLATIONS.ZADANIA,
  },
  {
    id: 'kalendarz',
    href: '/kalendarz',
    label: TRANSLATIONS.KALENDARZ,
  },
  {
    id: 'finanse',
    href: '/finanse',
    label: TRANSLATIONS.FINANSE,
  },
];

export default function ClusterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={poppins.variable}>
      <body>
        <ThemeProvider>
          <I18nProvider locale="pl">
            <LayoutContainer>
              <Box
                sx={{
                  gridArea: 'menu',
                  padding: '1rem 2rem',
                }}
              >
                <Menu items={MENU_ITEMS} />
              </Box>
              {children}
            </LayoutContainer>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
