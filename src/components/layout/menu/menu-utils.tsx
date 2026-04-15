import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HiveOutlinedIcon from '@mui/icons-material/HiveOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';

import { TRANSLATION_GROUPS } from '@/locales';

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
    label: TRANSLATION_GROUPS.DASHBOARD.CLUSTER,
    type: ['cluster', 'projects'],
    icon: <HiveOutlinedIcon />,
  },
  {
    id: 'projects',
    href: '/projects',
    label: TRANSLATION_GROUPS.PROJECTS.PROJEKTY,
    type: ['cluster', 'projects'],
    icon: <TokenOutlinedIcon />,
  },
  {
    id: 'tasks',
    href: '/zadania',
    label: TRANSLATION_GROUPS.DASHBOARD.ZADANIA,
    type: 'cluster',
    icon: <ChecklistOutlinedIcon />,
  },
  {
    id: 'calendar',
    href: '/kalendarz',
    label: TRANSLATION_GROUPS.DASHBOARD.KALENDARZ,
    type: 'cluster',
    icon: <CalendarMonthOutlinedIcon />,
  },
  {
    id: 'finance',
    href: '/finanse',
    label: TRANSLATION_GROUPS.DASHBOARD.FINANSE,
    type: 'cluster',
    icon: <CurrencyExchangeOutlinedIcon />,
  },
  {
    id: 'messages',
    href: '/messages',
    label: TRANSLATION_GROUPS.MESSAGES.WIADOMOSCI,
    type: 'cluster',
    icon: <EmailOutlinedIcon />,
  },
  {
    id: 'files',
    href: '/project/[id]/files',
    label: TRANSLATION_GROUPS.FILES.PLIKI,
    type: 'projects',
    icon: <AttachFileOutlinedIcon />,
  },
  {
    id: 'inspirations',
    href: '/project/[id]/inspirations',
    label: TRANSLATION_GROUPS.FILES.INSPIRACJE,
    type: 'projects',
    icon: <InsertPhotoOutlinedIcon />,
  },
  {
    id: 'messages',
    href: '/project/[id]/messages',
    label: TRANSLATION_GROUPS.MESSAGES.WIADOMOSCI,
    type: 'projects',
    icon: <EmailOutlinedIcon />,
  },
  {
    id: 'invitations',
    href: '/project/[id]/invitations',
    label: TRANSLATION_GROUPS.INVITATIONS.INVITATIONS,
    type: 'projects',
    onlyOwner: true,
    icon: <PeopleAltOutlinedIcon />,
  },
];
