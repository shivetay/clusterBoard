'use client';
import { TRANSLATIONS } from '@/locales';
import { useAlert } from '@/providers';
import type { IStageData } from '@/types';
import AddStageModal from './add-stage-modal';
import { AddStageTaskModal } from './add-stage-task';
import { CloseStageModal } from './close-stage-modal';
import EditStageModal from './edit-stage-modal';
import { RemoveStageModal } from './remove-stage';

type TStageModal =
  | 'add-stage'
  | 'edit-stage'
  | 'delete-stage'
  | 'add-stage-task'
  | 'close-stage';

interface IStageModalProps {
  type: TStageModal;
  stageData?: IStageData;
  projectId?: string;
}
const MODAL_COMPONENTS = {
  'add-stage': AddStageModal,
  'edit-stage': EditStageModal,
  'delete-stage': RemoveStageModal,
  'add-stage-task': AddStageTaskModal,
  'close-stage': CloseStageModal,
};

export function StageModal({ type, stageData, projectId }: IStageModalProps) {
  const Component = MODAL_COMPONENTS[type];
  const { showAlert } = useAlert();
  if (!stageData && type !== 'add-stage') {
    showAlert({
      message: TRANSLATIONS.GENERAL_ERROR,
      severity: 'error',
    });
    return null;
  }

  return (
    <Component
      stage_id={stageData?.id || ''}
      stageData={stageData}
      projectId={projectId || ''}
    />
  );
}

export default StageModal;
