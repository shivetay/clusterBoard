'use client';
import { TRANSLATIONS } from '@/locales';
import { useAlert } from '@/providers';
import type { IProjectData } from '@/types';
import AddProjectModal from './add-project';
import EditProjectModal from './edit-project';
import { RemoveProjectModal } from './remove-project';

type TProjectModal = 'add-project' | 'edit-project' | 'delete-project';

interface IProjectModalProps {
  type: TProjectModal;
  projectData?: IProjectData;
}
const MODAL_COMPONENTS = {
  'add-project': AddProjectModal,
  'edit-project': EditProjectModal,
  'delete-project': RemoveProjectModal,
};

export function ProjectModal({ type, projectData }: IProjectModalProps) {
  const Component = MODAL_COMPONENTS[type];
  const { showAlert } = useAlert();
  if (!projectData && type !== 'add-project') {
    showAlert({
      message: TRANSLATIONS.GENERAL_ERROR,
      severity: 'error',
    });
    return null;
  }

  return (
    <Component projectData={projectData} projectId={projectData?.id || ''} />
  );
}

export default ProjectModal;
