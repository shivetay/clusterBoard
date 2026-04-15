'use client';
import { useAuth } from '@clerk/nextjs';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import { CardComponent, LargeCard, Loader, PageContainer } from '@/components';
import { useIsMobile, useNotifications } from '@/lib';
import { TRANSLATION_GROUPS } from '@/locales';
import { useUser } from '@/stores';
import { ClusterCardContainer } from './cluster-view.styled';

export function ClusterView() {
  const isMobile = useIsMobile();
  const user = useUser();
  const { isLoaded } = useAuth();
  const projectsCount =
    user?.userInfo?.subscription?.usage?.active_owned_projects ??
    user?.userInfo?.cluster_projects?.length ??
    0;
  const maxProjects =
    user?.userInfo?.subscription?.limits?.max_projects ??
    user?.userInfo?.projects_limit ??
    null;
  const projectsLimit =
    maxProjects === null || maxProjects === undefined ? '∞' : maxProjects;
  const taskCount = 0;
  const { data: notificationsData } = useNotifications();
  const messageCount = notificationsData?.counts.messages ?? 0;

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <ClusterCardContainer>
        {isMobile && (
          <LargeCard
            key={TRANSLATION_GROUPS.PROJECTS.PROJEKTY}
            extended
            span={2}
            description={TRANSLATION_GROUPS.PROJECTS.AKTYWNE_PROJEKTY}
            count={projectsCount}
            maxCount={projectsLimit}
            header={TRANSLATION_GROUPS.PROJECTS.PROJEKTY}
            href={'/projects'}
            icon={<TokenOutlinedIcon />}
          />
        )}
        <CardComponent
          key={TRANSLATION_GROUPS.DASHBOARD.ZADANIA}
          description={TRANSLATION_GROUPS.DASHBOARD.AKTYWNE_ZADANIA}
          count={taskCount}
          header={TRANSLATION_GROUPS.DASHBOARD.ZADANIA}
          href={'/zadania'}
          icon={<ChecklistOutlinedIcon />}
        />
        <CardComponent
          key={TRANSLATION_GROUPS.DASHBOARD.KALENDARZ}
          header={TRANSLATION_GROUPS.DASHBOARD.KALENDARZ}
          description={TRANSLATION_GROUPS.DASHBOARD.AKTYWNE_SPOTKANIA}
          count={0}
          href={'/kalendarz'}
          icon={<CalendarMonthOutlinedIcon />}
        />
        <CardComponent
          key={TRANSLATION_GROUPS.DASHBOARD.FINANSE}
          header={TRANSLATION_GROUPS.DASHBOARD.FINANSE}
          description={TRANSLATION_GROUPS.DASHBOARD.FINANSE}
          href={'/finanse'}
          icon={<CurrencyExchangeOutlinedIcon />}
        />
        {!isMobile && (
          <LargeCard
            key={TRANSLATION_GROUPS.PROJECTS.PROJEKTY}
            extended
            span={2}
            description={TRANSLATION_GROUPS.PROJECTS.AKTYWNE_PROJEKTY}
            count={projectsCount}
            maxCount={projectsLimit}
            header={TRANSLATION_GROUPS.PROJECTS.PROJEKTY}
            href={'/projects'}
            icon={<TokenOutlinedIcon />}
          />
        )}
        <CardComponent
          key={TRANSLATION_GROUPS.MESSAGES.WIADOMOSCI}
          description={TRANSLATION_GROUPS.MESSAGES.OCZEKUJACE_WIADOMOSCI}
          count={messageCount}
          header={TRANSLATION_GROUPS.MESSAGES.WIADOMOSCI}
          href={'/messages'}
          icon={<EmailOutlinedIcon />}
          disabled={false}
        />
      </ClusterCardContainer>
    </PageContainer>
  );
}

export default ClusterView;
