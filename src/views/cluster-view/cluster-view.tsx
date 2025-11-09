// import { Box } from '@mui/material';
import { CardComponent, PageContainer } from '@/components';
import { TRANSLATIONS } from '@/locales';
import { ClusterCardContainer } from './cluster-view.styled';

const CARD_DATA = [
  {
    id: 'projekty',
    title: TRANSLATIONS.PROJEKTY,
    description: TRANSLATIONS.AKTYWNE_PROJEKTY,
    count: 5,
    color: '#01c3a8',
    href: '/projects',
  },
  {
    id: 'zadania',
    title: TRANSLATIONS.ZADANIA,
    description: TRANSLATIONS.AKTYWNE_ZADANIA,
    count: 15,
    color: '#c301a8',
    href: '/zadania',
  },
  {
    id: 'kalendarz',
    title: TRANSLATIONS.KALENDARZ,
    color: '#a8c301',
    href: '/kalendarz',
  },
  {
    id: 'wiadomosci',
    title: TRANSLATIONS.WIADOMOSCI,
    description: TRANSLATIONS.OCZEKUJACE_WIADOMOSCI,
    count: 7,
    color: '#01a8c3',
    href: 'wiadomosci',
  },
  {
    id: 'finanse',
    title: TRANSLATIONS.FINANSE,
    color: '#c3a801',
    href: '/finanse',
  },
];

export function ClusterView() {
  return (
    <PageContainer>
      <ClusterCardContainer>
        {CARD_DATA.map((data) => (
          <CardComponent
            key={data.id}
            color={data.color}
            description={data.description}
            count={data.count}
            header={data.title}
            href={data.href}
          />
        ))}
      </ClusterCardContainer>
    </PageContainer>
  );
}

export default ClusterView;
