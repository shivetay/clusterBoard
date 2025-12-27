'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInput, Loader } from '@/components/ui';
import { formatDateForInput, useEditProject } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import {
  createProjectSchema,
  type EditProjectFormData,
  type ProjectFormData,
} from '@/schemas';
import { useUser } from '@/stores';
import type { IProjectData } from '@/types';
import {
  AddProjectModalContainer,
  AddProjectModalForm,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

interface IEditProjectModalProps {
  projectData?: IProjectData;
}

export function EditProjectModal({ projectData }: IEditProjectModalProps) {
  const { t } = useTranslation();
  const { editProject, isPending } = useEditProject(projectData?.id || '');
  const { userInfo } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      project_name: projectData?.project_name || '',
      project_description: projectData?.project_description || '',
      owner: {
        owner_id: userInfo?.id || '',
      },
      start_date: formatDateForInput(projectData?.start_date),
      end_date: formatDateForInput(projectData?.end_date),
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const disabled =
    Object.keys(errors).length > 0 || watch('project_name') === '';

  useEffect(() => {
    if (projectData) {
      reset({
        project_name: projectData.project_name,
        project_description: projectData.project_description,
        owner: {
          owner_id: userInfo?.id || '',
          owner_name: userInfo?.user_name || '',
        },
        start_date: formatDateForInput(projectData.start_date),
        end_date: formatDateForInput(projectData.end_date),
      });
    }
  }, [projectData, reset, userInfo?.id, userInfo?.user_name]);

  const handleOnSubmit = (data: EditProjectFormData) => {
    editProject({
      project_name: data.project_name || '',
      project_description: data.project_description || '',
      start_date: data.start_date || '',
      end_date: data.end_date || '',
      owner: {
        owner_id: userInfo?.id || '',
        owner_name: userInfo?.user_name || '',
      },
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
              {...register('project_name')}
              name="project_name"
              label={t(TRANSLATIONS.PROJECT_NAME)}
              type="text"
              helperText={t(TRANSLATIONS.PROJECT_NAME_HELPER_TEXT)}
              error={errors.project_name?.message}
            />
            <FormInput
              {...register('project_description')}
              name="project_description"
              label={t(TRANSLATIONS.PROJECT_DESCRIPTION)}
              type="textarea"
              helperText={t(TRANSLATIONS.STAGE_DESCRIPTION_HELPER_TEXT)}
              error={errors.project_description?.message}
            />
            <Box display="flex" flexDirection="row" gap={2} width="100%">
              <FormInput
                {...register('start_date')}
                name="start_date"
                label={t(TRANSLATIONS.START_DATE)}
                type="date"
                error={errors.start_date?.message}
              />
              <FormInput
                {...register('end_date')}
                name="end_date"
                label={t(TRANSLATIONS.END_DATE)}
                type="date"
                error={errors.end_date?.message}
              />
            </Box>

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

export default EditProjectModal;
