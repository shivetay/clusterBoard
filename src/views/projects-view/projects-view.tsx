'use client';
import { CustomButton, PageContainer } from '@/components';
import { TRANSLATIONS } from '@/locales';
import { ActionContainer, ProjectsContainer } from './projects-view.styled';

export function ProjectsView() {
  return (
    <PageContainer>
      <ActionContainer>
        <span>5/5</span>
        <CustomButton>{TRANSLATIONS.ADD_NEW_PROJECT}</CustomButton>
      </ActionContainer>
      <ProjectsContainer></ProjectsContainer>
    </PageContainer>
  );
}

export default ProjectsView;
