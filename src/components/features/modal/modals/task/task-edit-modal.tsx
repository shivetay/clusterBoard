'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInput, Loader } from '@/components/ui';
import { useEditTask } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { type TaskFormData, taskSchema } from '@/schemas';
import type { TTaskData } from '@/types';
import {
  AddProjectModalContainer,
  AddProjectModalForm,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

interface ITaskEditModalProps {
  taskData?: TTaskData;
}

export function TaskEditModal({ taskData }: ITaskEditModalProps) {
  const { t } = useTranslation();
  const { editTask, isPending } = useEditTask(taskData?.id || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task_name: taskData?.task_name || '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const disabled = Object.keys(errors).length > 0 || watch('task_name') === '';

  useEffect(() => {
    if (taskData) {
      reset({
        task_name: taskData.task_name,
      });
    }
  }, [taskData, reset]);

  const handleOnSubmit = (data: TaskFormData) => {
    editTask({
      task_name: data.task_name || '',
    });
  };

  return (
    <AddProjectModalContainer>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <AddProjectModalHeader>
            <AddProjectModalTitle as="h2" variant="h2">
              {t(TRANSLATIONS.PROJECT_EDIT_HEADER)}
            </AddProjectModalTitle>
          </AddProjectModalHeader>
          <AddProjectModalForm
            formId="add-project-form"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <FormInput
              {...register('task_name')}
              name="task_name"
              label={t(TRANSLATIONS.STAGE_NAME)}
              type="text"
              helperText={t(TRANSLATIONS.STAGE_NAME_HELPER_TEXT)}
              error={errors.task_name?.message}
            />

            <ModalButton
              disabled={disabled}
              type="submit"
              variant="contained"
              color="primary"
            >
              {t(TRANSLATIONS.PROJECT_EDIT_BTN)}
            </ModalButton>
          </AddProjectModalForm>
        </>
      )}
    </AddProjectModalContainer>
  );
}

export default TaskEditModal;
