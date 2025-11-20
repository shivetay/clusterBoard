'use client';
import { FormControl, InputLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomButton, Loader } from '@/components/ui';
import { useCreateNewProject } from '@/lib/api/hooks';
import { TRANSLATIONS } from '@/locales/pl/locales';
import { useUser } from '@/stores';
import type { TFormData } from '@/types';
import {
  AddProjectModalContainer,
  AddProjectModalForm,
  AddProjectModalTitle,
  HelperText,
} from '../modal.styled';

export function AddProjectModal() {
  const { t } = useTranslation();
  const { createProject, isPending } = useCreateNewProject();
  const { userInfo } = useUser();
  const { register, handleSubmit } = useForm<TFormData>({
    defaultValues: {
      project_name: '',
      owner: userInfo?.id || '',
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
          <AddProjectModalTitle>
            {t(TRANSLATIONS.ADD_PROJECT_MODAL_TITLE)}
          </AddProjectModalTitle>
          <AddProjectModalForm
            formId="add-project-form"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <InputLabel>{t(TRANSLATIONS.PROJECT_NAME)}</InputLabel>
            <FormControl>
              <TextField
                {...register('project_name')}
                required
                fullWidth
                type="text"
              />
              <HelperText>
                {t(TRANSLATIONS.PROJECT_NAME_HELPER_TEXT)}
              </HelperText>
            </FormControl>
            <CustomButton type="submit" variant="contained" color="primary">
              {t(TRANSLATIONS.ADD_PROJECT_MODAL_BTN)}
            </CustomButton>
          </AddProjectModalForm>
        </>
      )}
    </AddProjectModalContainer>
  );
}

export default AddProjectModal;
