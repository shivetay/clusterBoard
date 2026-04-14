'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type z from 'zod';
import {
  FormComponent,
  FormHelperText,
  FormInput,
  Loader,
} from '@/components/ui';
import { useAddProjectStage } from '@/lib';
import { TRANSLATION_GROUPS } from '@/locales';
import { useModal } from '@/providers';
import { stageFormSchema } from '@/schemas';
import type { IStageData } from '@/types';
import {
  AddProjectModalContainer,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

type TAddStageProps = {
  projectId: string;
};

export function AddStageModal({ projectId }: TAddStageProps) {
  const { t } = useTranslation();
  const { setIsOpen } = useModal();
  // TODO change to project update
  const { addStage, isPending } = useAddProjectStage(projectId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<z.input<typeof stageFormSchema>>({
    resolver: zodResolver(stageFormSchema),
    defaultValues: {
      stage_name: '',
      stage_description: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const disabledBtn =
    Object.keys(errors).length > 0 || watch('stage_name') === '';

  const handleOnSubmit = (data: z.input<typeof stageFormSchema>) => {
    addStage(data as IStageData);
  };

  return (
    <AddProjectModalContainer>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <AddProjectModalHeader>
            <AddProjectModalTitle as="h2" variant="h2">
              {t(TRANSLATION_GROUPS.STAGES.ADD_STAGE_MODAL_TITLE)}
            </AddProjectModalTitle>
            <FormHelperText>
              {t(TRANSLATION_GROUPS.STAGES.ADD_STAGE_MODAL_HELPER_TEXT)}
            </FormHelperText>
          </AddProjectModalHeader>

          <FormComponent
            formId="add-stage-form"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <FormInput
              {...register('stage_name')}
              name="stage_name"
              label={t(TRANSLATION_GROUPS.STAGES.STAGE_NAME)}
              type="text"
              placeholder={t(
                TRANSLATION_GROUPS.STAGES.ADD_STAGE_FORM_PLACEHOLDER,
              )}
              helperText={t(TRANSLATION_GROUPS.STAGES.STAGE_NAME_HELPER_TEXT)}
              error={errors.stage_name?.message}
            />

            <FormInput
              {...register('stage_description')}
              name="stage_description"
              label={t(TRANSLATION_GROUPS.STAGES.STAGE_DESCRIPTION)}
              type="textarea"
              defaultValue={watch('stage_description')}
              placeholder={t(TRANSLATION_GROUPS.STAGES.ADD_STAGE_FORM_DETAILS)}
              helperText={t(
                TRANSLATION_GROUPS.STAGES.STAGE_DESCRIPTION_HELPER_TEXT,
              )}
              error={errors.stage_description?.message}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                width: '100%',
              }}
            >
              <ModalButton
                onClick={() => setIsOpen(false)}
                variant="outlined"
                color="secondary"
              >
                {t(TRANSLATION_GROUPS.COMMON.CANCEL)}
              </ModalButton>
              <ModalButton
                disabled={disabledBtn}
                type="submit"
                variant="contained"
                color="primary"
              >
                {t(TRANSLATION_GROUPS.STAGES.ADD_STAGE)}
              </ModalButton>
            </Box>
          </FormComponent>
        </>
      )}
    </AddProjectModalContainer>
  );
}

export default AddStageModal;
