import { TRANSLATIONS } from '@/locales';

type TMenuItem = {
  id: string;
  href: string;
  label: string;
  type: Array<'cluster' | 'projects'> | 'cluster' | 'projects';
};

export const MENU_ITEM_LIST: TMenuItem[] = [
  {
    id: 'Klaster',
    href: '/cluster',
    label: TRANSLATIONS.CLUSTER,
    type: ['cluster', 'projects'],
  },
  {
    id: 'projekty',
    href: '/projects',
    label: TRANSLATIONS.PROJEKTY,
    type: ['cluster', 'projects'],
  },
  {
    id: 'zadania',
    href: '/zadania',
    label: TRANSLATIONS.ZADANIA,
    type: 'cluster',
  },
  {
    id: 'kalendarz',
    href: '/kalendarz',
    label: TRANSLATIONS.KALENDARZ,
    type: 'cluster',
  },
  {
    id: 'finanse',
    href: '/finanse',
    label: TRANSLATIONS.FINANSE,
    type: 'cluster',
  },
  {
    id: 'pliki',
    href: '/pliki',
    label: TRANSLATIONS.PLIKI,
    type: 'projects',
  },
  {
    id: 'inspiracje',
    href: '/inspiracje',
    label: TRANSLATIONS.INSPIRACJE,
    type: 'projects',
  },
  {
    id: 'widomosci',
    href: '/wiadomoscie',
    label: TRANSLATIONS.WIADOMOSCI,
    type: 'projects',
  },
];
