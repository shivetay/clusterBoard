'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type z from 'zod';
import { FormInput } from '@/components/ui';
import { createComment } from '@/lib/actions';
import { TRANSLATIONS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import { commentSchema } from '@/schemas';
import {
  AddProjectModalContainer,
  AddProjectModalForm,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

export function AddStageTaskModal({
  stage_id,
  task_id,
}: {
  stage_id: string;
  task_id: string;
}) {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<z.input<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment_text: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const disabled =
    Object.keys(errors).length > 0 ||
    watch('comment_text')?.length === 0 ||
    watch('comment_text') === '';

  const handleOnSubmit = async (data: z.input<typeof commentSchema>) => {
    const formData = new FormData();
    formData.append('comment_text', data.comment_text);
    const result = await createComment(formData, stage_id, task_id);

    if (result.success) {
      showAlert({
        message: t(TRANSLATIONS.COMMENT_ADDED_SUCCESSFULLY),
        severity: 'success',
      });
    } else {
      showAlert({
        message: t(TRANSLATIONS.ERROR_COMMENT_TEXT),
        severity: 'error',
      });
    }
    setIsOpen(false);
  };

  return (
    <AddProjectModalContainer>
      <AddProjectModalHeader>
        <AddProjectModalTitle as="h2" variant="h2">
          {t(TRANSLATIONS.ADD_COMMENT_MODAL_TITLE)}
        </AddProjectModalTitle>
      </AddProjectModalHeader>

      <AddProjectModalForm
        formId="add-comment-form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <FormInput
          {...register('comment_text')}
          name="comment_text"
          label={t(TRANSLATIONS.ADD_COMMENT_MODAL_TITLE)}
          type="textarea"
          helperText={t(TRANSLATIONS.ADD_COMMENT_MODAL_HELPER_TEXT)}
          error={errors.comment_text?.message}
        />

        <ModalButton
          disabled={disabled}
          type="submit"
          variant="contained"
          color="primary"
        >
          {t(TRANSLATIONS.ADD_COMMENT_MODAL_BTN)}
        </ModalButton>
      </AddProjectModalForm>
    </AddProjectModalContainer>
  );
}

export default AddStageTaskModal;
