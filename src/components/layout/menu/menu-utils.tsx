import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HiveOutlinedIcon from '@mui/icons-material/HiveOutlined';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';

import { TRANSLATIONS } from '@/locales';

type TMenuItem = {
  id: string;
  href: string;
  label: string;
  type: Array<'cluster' | 'projects'> | 'cluster' | 'projects';
  icon?: React.ReactNode;
};

export const MENU_ITEM_LIST: TMenuItem[] = [
  {
    id: 'cluster',
    href: '/cluster',
    label: TRANSLATIONS.CLUSTER,
    type: ['cluster', 'projects'],
    icon: <HiveOutlinedIcon />,
  },
  {
    id: 'projects',
    href: '/projects',
    label: TRANSLATIONS.PROJEKTY,
    type: ['cluster', 'projects'],
    icon: <TokenOutlinedIcon />,
  },
  {
    id: 'tasks',
    href: '/zadania',
    label: TRANSLATIONS.ZADANIA,
    type: 'cluster',
    icon: <ChecklistOutlinedIcon />,
  },
  {
    id: 'calendar',
    href: '/kalendarz',
    label: TRANSLATIONS.KALENDARZ,
    type: 'cluster',
    icon: <CalendarMonthOutlinedIcon />,
  },
  {
    id: 'finance',
    href: '/finanse',
    label: TRANSLATIONS.FINANSE,
    type: 'cluster',
    icon: <CurrencyExchangeOutlinedIcon />,
  },
  {
    id: 'files',
    href: '/pliki',
    label: TRANSLATIONS.PLIKI,
    type: 'projects',
  },
  {
    id: 'inspirations',
    href: '/inspiracje',
    label: TRANSLATIONS.INSPIRACJE,
    type: 'projects',
  },
  {
    id: 'messages',
    href: '/wiadomoscie',
    label: TRANSLATIONS.WIADOMOSCI,
    type: 'projects',
    icon: <EmailOutlinedIcon />,
  },
];
