'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormHelperText, FormInput, Loader } from '@/components/ui';
import { useCreateNewProject } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { createProjectSchema, type ProjectFormData } from '@/schemas';
import { useUser } from '@/stores';
import {
  AddProjectModalContainer,
  AddProjectModalForm,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

export function AddProjectModal() {
  const { t } = useTranslation();
  const { createProject, isPending } = useCreateNewProject();
  const { userInfo } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      project_name: '',
      project_description: undefined,
      owner: userInfo?.id || '',
      start_date: '',
      end_date: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const disabled =
    Object.keys(errors).length > 0 || watch('project_name') === '';

  const handleOnSubmit = (data: ProjectFormData) => {
    createProject({
      project_name: data.project_name,
      project_description: data.project_description || '',
      owner: data.owner,
      start_date: data.start_date || '',
      end_date: data.end_date || '',
      project_stages: [],
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
              {t(TRANSLATIONS.ADD_PROJECT_MODAL_BTN)}
            </ModalButton>
          </AddProjectModalForm>
        </>
      )}
    </AddProjectModalContainer>
  );
}

export default AddProjectModal;
