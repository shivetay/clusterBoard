'use client';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormHelperText, FormInput, Loader } from '@/components/ui';
import { useCreateNewProject } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { useUser } from '@/stores';
import type { TFormData } from '@/types';
import {
  AddButton,
  AddProjectModalContainer,
  AddProjectModalForm,
  AddProjectModalHeader,
  AddProjectModalTitle,
} from '../modal.styled';

export function AddProjectModal() {
  const { t } = useTranslation();
  const { createProject, isPending } = useCreateNewProject();
  const { userInfo } = useUser();
  const { register, handleSubmit } = useForm<TFormData>({
    defaultValues: {
      project_name: '',
      project_description: '',
      owner: userInfo?.id || '',
      start_date: '',
      end_date: '',
    },
  });

  const handleOnSubmit = (data: TFormData) => {
    createProject(data);
  };

  return (
    <AddProjectModalContainer>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <AddProjectModalHeader>
            <AddProjectModalTitle as="h2" variant="h2">
              {t(TRANSLATIONS.ADD_PROJECT_MODAL_TITLE)}
            </AddProjectModalTitle>
            <FormHelperText>
              {t(TRANSLATIONS.ADD_PROJECT_MODAL_HELPER_TEXT)}
            </FormHelperText>
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
              placeholder={t(TRANSLATIONS.ADD_PROJECT_FORM_PLACEHOLDER)}
              helperText={t(TRANSLATIONS.PROJECT_NAME_HELPER_TEXT)}
            />

            <Box display="flex" flexDirection="row" gap={2} width="100%">
              <FormInput
                {...register('start_date')}
                name="start_date"
                label={t(TRANSLATIONS.START_DATE)}
                type="date"
              />
              <FormInput
                {...register('end_date')}
                name="end_date"
                label={t(TRANSLATIONS.END_DATE)}
                type="date"
              />
            </Box>

            <AddButton type="submit" variant="contained" color="primary">
              {t(TRANSLATIONS.ADD_PROJECT_MODAL_BTN)}
            </AddButton>
          </AddProjectModalForm>
        </>
      )}
    </AddProjectModalContainer>
  );
}

export default AddProjectModal;
