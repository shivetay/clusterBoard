'use client';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Radio } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TaskModal } from '@/components/features/modal/modals/task/task-modal';
import { ActionButtons } from '@/components/features/project-stage-container/project-stage-container.styled';
import { apiClient, useEditTask } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { IStageTask } from '@/types';
import { StageTaskContainer, TaskRadio } from './stage-task.styled';

interface IStageTaskComponentProps {
  stage_tasks: IStageTask[];
  isStageClosed: boolean;
}

export function StageTaskComponent({
  stage_tasks,
  isStageClosed,
}: IStageTaskComponentProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const { setModalContent } = useModal();
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { editTask } = useEditTask(selectedTask || '');

  const handleToggle = (task: IStageTask) => {
    setSelectedTask((prev) => (prev === task.id ? null : task.id));

    editTask({ is_done: !task.is_done });
  };

  const handleTaskEdit = (task: IStageTask) => {
    setModalContent(<TaskModal type="edit-task" taskData={task} />);
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      await apiClient.delete(`/tasks/${taskId}`);
      queryClient.invalidateQueries({ queryKey: ['user-projects'] });
      router.refresh();
      showAlert({
        message: t(TRANSLATIONS.TASK_REMOVED_SUCCESSFULLY),
        severity: 'success',
      });
    } catch {
      showAlert({
        message: t(TRANSLATIONS.ERROR_REMOVE_TASK),
        severity: 'error',
      });
    }
  };

  return (
    <StageTaskContainer>
      {stage_tasks.map((task) => (
        <Box
          key={task.id}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TaskRadio
            disabled={isStageClosed}
            key={task.id}
            control={
              <Radio
                checked={task.is_done}
                onClick={() => handleToggle(task)}
              />
            }
            label={task.task_name}
          />
          <Box display="flex" flexDirection="row">
            <ActionButtons
              disabled={task.is_done || isStageClosed}
              startIcon={<ChatBubbleOutlineOutlinedIcon />}
            />
            <ActionButtons
              disabled={task.is_done || isStageClosed}
              startIcon={<EditOutlinedIcon />}
              onClick={() => handleTaskEdit(task)}
            />
            <ActionButtons
              disabled={task.is_done || isStageClosed}
              startIcon={<DeleteForeverOutlinedIcon />}
              onClick={() => {
                handleTaskDelete(task.id);
              }}
            />
          </Box>
        </Box>
      ))}
    </StageTaskContainer>
  );
}
export default StageTaskComponent;
