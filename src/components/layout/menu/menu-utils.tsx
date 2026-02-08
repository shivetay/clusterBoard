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
  onlyOwner?: boolean;
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
    href: '/project/[id]/files',
    label: TRANSLATIONS.PLIKI,
    type: 'projects',
  },
  {
    id: 'inspirations',
    href: '/project/[id]/inspirations',
    label: TRANSLATIONS.INSPIRACJE,
    type: 'projects',
  },
  {
    id: 'messages',
    href: '/project/[id]/messages',
    label: TRANSLATIONS.WIADOMOSCI,
    type: 'projects',
    icon: <EmailOutlinedIcon />,
  },
  {
    id: 'invitations',
    href: '/project/[id]/invitations',
    label: TRANSLATIONS.INVITATIONS,
    type: 'projects',
    onlyOwner: true,
  },
];
