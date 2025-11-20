'use client';
import { CardComponent, PageContainer } from '@/components';
import { TRANSLATIONS } from '@/locales';
import { useUser } from '@/stores';

import { ClusterCardContainer } from './cluster-view.styled';

export function ClusterView() {
  const user = useUser();
  const projectsCount = user?.userInfo?.cluster_projects?.length || 0;
  const projectsLimit = user?.userInfo?.projects_limit || 0;
  const taskCount = 0;
  const messageCount = 0;

  return (
    <PageContainer>
      <ClusterCardContainer>
        <CardComponent
          key={TRANSLATIONS.PROJEKTY}
          description={TRANSLATIONS.AKTYWNE_PROJEKTY}
          count={projectsCount}
          maxCount={projectsLimit}
          header={TRANSLATIONS.PROJEKTY}
          href={'/projects'}
        />
        <CardComponent
          key={TRANSLATIONS.ZADANIA}
          description={TRANSLATIONS.AKTYWNE_ZADANIA}
          count={taskCount}
          header={TRANSLATIONS.ZADANIA}
          href={'/zadania'}
        />
        <CardComponent
          key={TRANSLATIONS.WIADOMOSCI}
          description={TRANSLATIONS.OCZEKUJACE_WIADOMOSCI}
          count={messageCount}
          header={TRANSLATIONS.WIADOMOSCI}
          href={'/wiadomosci'}
        />
        <CardComponent
          key={TRANSLATIONS.KALENDARZ}
          header={TRANSLATIONS.KALENDARZ}
          href={'/kalendarz'}
        />
        <CardComponent
          key={TRANSLATIONS.FINANSE}
          header={TRANSLATIONS.FINANSE}
          href={'/finanse'}
        />
      </ClusterCardContainer>
    </PageContainer>
  );
}

export default ClusterView;
