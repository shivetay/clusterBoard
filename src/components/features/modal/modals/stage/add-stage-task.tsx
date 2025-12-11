'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type z from 'zod';
import { FormInput, Loader } from '@/components/ui';
import { useAddStageTasks } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { stageTaskSchema } from '@/schemas';
import {
  AddProjectModalContainer,
  AddProjectModalForm,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

export function AddStageTaskModal({ stage_id }: { stage_id: string }) {
  const { t } = useTranslation();
  const { addTasks, isPending } = useAddStageTasks(stage_id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<z.input<typeof stageTaskSchema>>({
    resolver: zodResolver(stageTaskSchema),
    defaultValues: {
      task_name: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const disabled =
    Object.keys(errors).length > 0 ||
    watch('task_name')?.length === 0 ||
    watch('task_name') === '';

  const handleOnSubmit = (data: z.input<typeof stageTaskSchema>) => {
    // Parse textarea input: support both newlines and comma-separated values
    // First split by newlines, then split each line by commas
    const taskNames = data.task_name
      .split('\n')
      .flatMap((line) =>
        line
          .split(',')
          .map((task) => task.trim())
          .filter((task) => task.length > 0),
      )
      .filter((task) => task.length > 0);

    // Send as array of strings - backend will create a separate task for each task name
    // Backend expects: { stage_task: ["task1", "task2", "task3"] } or { stage_task: "task1, task2, task3" }
    addTasks(taskNames);
  };
  return (
    <AddProjectModalContainer>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <AddProjectModalHeader>
            <AddProjectModalTitle as="h2" variant="h2">
              {t(TRANSLATIONS.ADD_TASK_MODAL_TITLE)}
            </AddProjectModalTitle>
          </AddProjectModalHeader>

          <AddProjectModalForm
            formId="add-project-form"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <FormInput
              {...register('task_name')}
              name="task_name"
              label={t(TRANSLATIONS.STAGE_TASKS)}
              type="textarea"
              helperText={t(TRANSLATIONS.STAGE_TASKS_HELPER_TEXT)}
              error={errors.task_name?.message}
            />

            <ModalButton
              disabled={disabled}
              type="submit"
              variant="contained"
              color="primary"
            >
              {t(TRANSLATIONS.ADD_TASK_MODAL_BTN)}
            </ModalButton>
          </AddProjectModalForm>
        </>
      )}
    </AddProjectModalContainer>
  );
}

export default AddStageTaskModal;
