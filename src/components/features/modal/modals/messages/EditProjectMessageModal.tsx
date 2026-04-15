'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type z from 'zod';
import { FormInput } from '@/components/ui';
import { updateProjectMessageAction } from '@/lib/actions';
import { TRANSLATION_GROUPS } from '@/locales';
import { useAlert, useModal } from '@/providers';
import { projectMessageBodySchema } from '@/schemas';
import {
  AddProjectModalContainer,
  AddProjectModalForm,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

type TEditProjectMessageModalProps = {
  projectId: string;
  messageId: string;
  initialBody: string;
};

export function EditProjectMessageModal({
  projectId,
  messageId,
  initialBody,
}: TEditProjectMessageModalProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<z.input<typeof projectMessageBodySchema>>({
    resolver: zodResolver(projectMessageBodySchema),
    defaultValues: { body: initialBody },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    reset({ body: initialBody });
  }, [initialBody, reset]);

  const bodyVal = watch('body') ?? '';
  const disabled =
    Object.keys(errors).length > 0 || bodyVal.trim().length === 0;

  const handleOnSubmit = async (
    data: z.input<typeof projectMessageBodySchema>,
  ) => {
    const result = await updateProjectMessageAction(
      projectId,
      messageId,
      data.body,
    );

    if (result.success) {
      showAlert({
        message: t(TRANSLATION_GROUPS.MESSAGES.MESSAGE_EDITED_SUCCESSFULLY),
        severity: 'success',
      });
      router.refresh();
    } else {
      showAlert({
        message: t(TRANSLATION_GROUPS.ERRORS.ERROR_MESSAGE_SAVE),
        severity: 'error',
      });
    }
    setIsOpen(false);
  };

  return (
    <AddProjectModalContainer>
      <AddProjectModalHeader>
        <AddProjectModalTitle as="h2" variant="h2">
          {t(TRANSLATION_GROUPS.MESSAGES.MESSAGE_EDIT_HEADER)}
        </AddProjectModalTitle>
      </AddProjectModalHeader>
      <AddProjectModalForm
        formId="edit-project-message-form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <FormInput
          {...register('body')}
          name="body"
          label={t(TRANSLATION_GROUPS.MESSAGES.MESSAGE_BODY_LABEL)}
          type="textarea"
          helperText={t(TRANSLATION_GROUPS.MESSAGES.MESSAGE_BODY_HELPER)}
          error={errors.body?.message}
        />

        <ModalButton
          disabled={disabled}
          type="submit"
          variant="contained"
          color="primary"
          aria-label={t(TRANSLATION_GROUPS.MESSAGES.MESSAGE_EDIT_BTN)}
        >
          {t(TRANSLATION_GROUPS.MESSAGES.MESSAGE_EDIT_BTN)}
        </ModalButton>
      </AddProjectModalForm>
    </AddProjectModalContainer>
  );
}
