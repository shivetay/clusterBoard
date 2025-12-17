'use client';
import { TRANSLATIONS } from '@/locales';
import { useAlert } from '@/providers';
import type { TTaskData } from '@/types';
import { TaskEditModal } from './task-edit-modal';

type TTaskModal = 'edit-task';

interface ITaskModalProps {
  type: TTaskModal;
  taskData?: TTaskData;
  stageId?: string;
}
const MODAL_COMPONENTS = {
  'edit-task': TaskEditModal,
};

export function TaskModal({ type, taskData }: ITaskModalProps) {
  const Component = MODAL_COMPONENTS[type];
  const { showAlert } = useAlert();
  if (!taskData && type !== 'edit-task') {
    showAlert({
      message: TRANSLATIONS.GENERAL_ERROR,
      severity: 'error',
    });
    return null;
  }

  return <Component taskData={taskData} />;
}

export default TaskModal;
