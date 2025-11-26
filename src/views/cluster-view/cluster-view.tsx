'use client';
import { useAuth } from '@clerk/nextjs';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import { CardComponent, LargeCard, Loader, PageContainer } from '@/components';
import { useIsMobile } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { useUser } from '@/stores';
import { ClusterCardContainer } from './cluster-view.styled';

export function ClusterView() {
  const isMobile = useIsMobile();
  const user = useUser();
  const { isLoaded } = useAuth();
  const projectsCount = user?.userInfo?.cluster_projects?.length || 0;
  const projectsLimit = user?.userInfo?.projects_limit || 0;
  const taskCount = 0;
  const messageCount = 0;

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <ClusterCardContainer>
        {isMobile && (
          <LargeCard
            key={TRANSLATIONS.PROJEKTY}
            extended
            span={2}
            description={TRANSLATIONS.AKTYWNE_PROJEKTY}
            count={projectsCount}
            maxCount={projectsLimit}
            header={TRANSLATIONS.PROJEKTY}
            href={'/projects'}
            icon={<TokenOutlinedIcon />}
          />
        )}
        <CardComponent
          key={TRANSLATIONS.ZADANIA}
          description={TRANSLATIONS.AKTYWNE_ZADANIA}
          count={taskCount}
          header={TRANSLATIONS.ZADANIA}
          href={'/zadania'}
          icon={<ChecklistOutlinedIcon />}
        />
        <CardComponent
          key={TRANSLATIONS.KALENDARZ}
          header={TRANSLATIONS.KALENDARZ}
          description={TRANSLATIONS.AKTYWNE_SPOTKANIA}
          count={0}
          href={'/kalendarz'}
          icon={<CalendarMonthOutlinedIcon />}
        />
        <CardComponent
          key={TRANSLATIONS.FINANSE}
          header={TRANSLATIONS.FINANSE}
          description={TRANSLATIONS.FINANSE}
          href={'/finanse'}
          icon={<CurrencyExchangeOutlinedIcon />}
        />
        {!isMobile && (
          <LargeCard
            key={TRANSLATIONS.PROJEKTY}
            extended
            span={2}
            description={TRANSLATIONS.AKTYWNE_PROJEKTY}
            count={projectsCount}
            maxCount={projectsLimit}
            header={TRANSLATIONS.PROJEKTY}
            href={'/projects'}
            icon={<TokenOutlinedIcon />}
          />
        )}
        <CardComponent
          key={TRANSLATIONS.WIADOMOSCI}
          description={TRANSLATIONS.OCZEKUJACE_WIADOMOSCI}
          count={messageCount}
          header={TRANSLATIONS.WIADOMOSCI}
          href={'/wiadomosci'}
          icon={<CalendarMonthOutlinedIcon />}
        />
      </ClusterCardContainer>
    </PageContainer>
  );
}

export default ClusterView;
