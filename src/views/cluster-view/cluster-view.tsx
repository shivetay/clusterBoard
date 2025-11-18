import { CardComponent, PageContainer } from '@/components';
import { TRANSLATIONS } from '@/locales';
import { ClusterCardContainer } from './cluster-view.styled';

const CARD_DATA = [
  {
    id: 'projekty',
    title: TRANSLATIONS.PROJEKTY,
    description: TRANSLATIONS.AKTYWNE_PROJEKTY,
    count: 5,
    href: '/projects',
  },
  {
    id: 'zadania',
    title: TRANSLATIONS.ZADANIA,
    description: TRANSLATIONS.AKTYWNE_ZADANIA,
    count: 15,
    href: '/zadania',
  },
  {
    id: 'wiadomosci',
    title: TRANSLATIONS.WIADOMOSCI,
    description: TRANSLATIONS.OCZEKUJACE_WIADOMOSCI,
    count: 7,
    href: 'wiadomosci',
  },
  {
    id: 'kalendarz',
    title: TRANSLATIONS.KALENDARZ,
    href: '/kalendarz',
  },
  {
    id: 'finanse',
    title: TRANSLATIONS.FINANSE,
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
