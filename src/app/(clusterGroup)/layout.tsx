import { Box } from '@mui/material';
import { Menu } from '@/components';
import { TRANSLATIONS } from '@/locales';

const MENU_ITEMS = [
  {
    id: 'Klaster',
    href: '/cluster',
    label: TRANSLATIONS.CLUSTER,
  },
  {
    id: 'projekty',
    href: '/projects',
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
    <>
      <Box
        sx={{
          gridArea: 'menu',
          padding: '1rem 2rem',
        }}
      >
        <Menu items={MENU_ITEMS} />
      </Box>
      {children}
    </>
  );
}
