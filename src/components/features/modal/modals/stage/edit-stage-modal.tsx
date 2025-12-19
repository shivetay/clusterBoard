'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInput, Loader } from '@/components/ui';
import { useEditStage } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { type StageFormData, stageFormSchema } from '@/schemas';
import type { IStageData } from '@/types';
import {
  AddProjectModalContainer,
  AddProjectModalForm,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

interface IEditStageModalProps {
  stageData?: IStageData;
}

export function EditStageModal({ stageData }: IEditStageModalProps) {
  const { t } = useTranslation();
  const { editStage, isPending } = useEditStage(stageData?.id || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<StageFormData>({
    resolver: zodResolver(stageFormSchema),
    defaultValues: {
      stage_name: stageData?.stage_name || '',
      stage_description: stageData?.stage_description || '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const disabled = Object.keys(errors).length > 0 || watch('stage_name') === '';

  useEffect(() => {
    if (stageData) {
      reset({
        stage_name: stageData.stage_name,
        stage_description: stageData.stage_description,
      });
    }
  }, [stageData, reset]);

  const handleOnSubmit = (data: StageFormData) => {
    editStage({
      stage_name: data.stage_name || '',
      stage_description: data.stage_description || '',
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
              {...register('stage_name')}
              name="stage_name"
              label={t(TRANSLATIONS.STAGE_NAME)}
              type="text"
              helperText={t(TRANSLATIONS.STAGE_NAME_HELPER_TEXT)}
              error={errors.stage_name?.message}
            />
            <FormInput
              {...register('stage_description')}
              name="stage_description"
              label={t(TRANSLATIONS.STAGE_DESCRIPTION)}
              type="textarea"
              helperText={t(TRANSLATIONS.STAGE_DESCRIPTION_HELPER_TEXT)}
              error={errors.stage_description?.message}
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

export default EditStageModal;
