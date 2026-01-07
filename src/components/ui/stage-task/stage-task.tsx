'use client';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import { Box, Radio } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditCommentModal } from '@/components/features';
import AddCommentModal from '@/components/features/modal/modals/comments/AddCommentModal';
import { TaskModal } from '@/components/features/modal/modals/task/task-modal';
import { ActionButtons } from '@/components/features/project-stage-container/project-stage-container.styled';
import { apiClient, formatDateForInput, useEditTask } from '@/lib';
import { deleteComment } from '@/lib/actions';
import { TRANSLATIONS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import type { CommentFormData } from '@/schemas';
import { useUser } from '@/stores';
import type { IStageTask } from '@/types';
import {
  CommentContainer,
  CommentDetails,
  CommentText,
  StageTaskContainer,
  TaskRadio,
} from './stage-task.styled';

interface IStageTaskComponentProps {
  stage_tasks: IStageTask[];
  isStageClosed: boolean;
  isOwner: boolean;
}

export function StageTaskComponent({
  stage_tasks,
  isStageClosed,
  isOwner,
}: IStageTaskComponentProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const { setModalContent } = useModal();
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { editTask } = useEditTask(selectedTask || '');
  const { userInfo } = useUser();

  const handleToggle = (task: IStageTask) => {
    if (isOwner) {
      setSelectedTask((prev) => (prev === task.id ? null : task.id));
      editTask({ is_done: !task.is_done });
    }
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

  const handleCommentEdit = (comment: CommentFormData) => {
    setModalContent(<EditCommentModal commentData={comment} />);
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      showAlert({
        message: t(TRANSLATIONS.COMMENT_REMOVED_SUCCESSFULLY),
        severity: 'success',
      });
    } catch {
      showAlert({
        message: t(TRANSLATIONS.ERROR_REMOVE_COMMENT),
        severity: 'error',
      });
    }
  };

  return (
    <StageTaskContainer>
      {stage_tasks.map((task) => (
        <>
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
                startIcon={<ChatBubbleOutlineOutlinedIcon />}
                onClick={() => setShowComments(!showComments)}
              />
              <ActionButtons
                disabled={task.is_done || isStageClosed}
                startIcon={<MapsUgcOutlinedIcon />}
                onClick={() =>
                  setModalContent(
                    <AddCommentModal
                      stage_id={task.stage_id}
                      task_id={task.id}
                    />,
                  )
                }
              />
              <ActionButtons
                disabled={task.is_done || isStageClosed || !isOwner}
                startIcon={<EditOutlinedIcon />}
                onClick={() => handleTaskEdit(task)}
              />
              <ActionButtons
                disabled={task.is_done || isStageClosed || !isOwner}
                startIcon={<DeleteForeverOutlinedIcon />}
                onClick={() => {
                  handleTaskDelete(task.id);
                }}
              />
            </Box>
          </Box>
          {showComments && (
            <Box key={task.id}>
              {task.task_comments.map((comment) => (
                <CommentContainer key={comment.id}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <CommentDetails>
                      {t(TRANSLATIONS.AUTHOR_NAME)}: {comment.author_name}
                    </CommentDetails>
                    <Box>
                      <ActionButtons
                        disabled={
                          task.is_done ||
                          isStageClosed ||
                          comment.author !== userInfo?.id
                        }
                        startIcon={<EditOutlinedIcon />}
                        onClick={() => handleCommentEdit(comment)}
                      />
                      <ActionButtons
                        disabled={
                          task.is_done ||
                          isStageClosed ||
                          comment.author !== userInfo?.id
                        }
                        startIcon={<DeleteForeverOutlinedIcon />}
                        onClick={() => {
                          handleCommentDelete(comment.id);
                        }}
                      />
                    </Box>
                  </Box>

                  <CommentText key={comment.id}>
                    {comment.comment_text}
                  </CommentText>
                  <CommentDetails>
                    {comment.is_edited && ` ${t(TRANSLATIONS.EDITED)} `}
                    {t(TRANSLATIONS.DATE)}:{' '}
                    {formatDateForInput(comment.updatedAt)}
                  </CommentDetails>
                </CommentContainer>
              ))}
            </Box>
          )}
        </>
      ))}
    </StageTaskContainer>
  );
}
export default StageTaskComponent;
