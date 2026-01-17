'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type z from 'zod';
import { FormInput } from '@/components/ui';
import { editComment } from '@/lib/actions';
import { TRANSLATIONS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import { type CommentFormData, commentSchema } from '@/schemas';
import {
  AddProjectModalContainer,
  AddProjectModalForm,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

interface IEditCommentModalProps {
  commentData?: CommentFormData;
}

export function EditCommentModal({ commentData }: IEditCommentModalProps) {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<z.input<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment_text: commentData?.comment_text || '',
      is_edited: commentData?.is_edited || false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const disabled =
    Object.keys(errors).length > 0 || watch('comment_text') === '';

  useEffect(() => {
    if (commentData) {
      reset({
        comment_text: commentData.comment_text,
      });
    }
  }, [commentData, reset]);

  console.log(commentData);
  const handleOnSubmit = async (data: z.input<typeof commentSchema>) => {
    const result = await editComment(
      commentData?.id || '',
      data.comment_text || '',
    );

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
          {t(TRANSLATIONS.COMMENT_EDIT_HEADER)}
        </AddProjectModalTitle>
      </AddProjectModalHeader>
      <AddProjectModalForm
        formId="add-project-form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <FormInput
          {...register('comment_text')}
          name="comment_text"
          label={t(TRANSLATIONS.COMMENT_TEXT)}
          type="text"
          helperText={t(TRANSLATIONS.COMMENT_TEXT_HELPER_TEXT)}
          error={errors.comment_text?.message}
        />

        <ModalButton
          disabled={disabled}
          type="submit"
          variant="contained"
          color="primary"
          aria-label={t(TRANSLATIONS.COMMENT_EDIT_BTN)}
        >
          {t(TRANSLATIONS.COMMENT_EDIT_BTN)}
        </ModalButton>
      </AddProjectModalForm>
    </AddProjectModalContainer>
  );
}

export default EditCommentModal;
