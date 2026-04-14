'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type z from 'zod';
import { FormInput } from '@/components/ui';
import { createProjectMessageAction } from '@/lib/actions';
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

type TAddProjectMessageModalProps = {
  projectId: string;
  parent_message_id?: string | null;
};

export function AddProjectMessageModal({
  projectId,
  parent_message_id = null,
}: TAddProjectMessageModalProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setIsOpen } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<z.input<typeof projectMessageBodySchema>>({
    resolver: zodResolver(projectMessageBodySchema),
    defaultValues: { body: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const bodyVal = watch('body') ?? '';
  const disabled =
    Object.keys(errors).length > 0 || bodyVal.trim().length === 0;

  const handleOnSubmit = async (
    data: z.input<typeof projectMessageBodySchema>,
  ) => {
    const result = await createProjectMessageAction(
      projectId,
      data.body,
      parent_message_id,
    );

    if (result.success) {
      showAlert({
        message: t(TRANSLATION_GROUPS.MESSAGES.MESSAGE_ADDED_SUCCESSFULLY),
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

  const titleKey = parent_message_id
    ? TRANSLATION_GROUPS.MESSAGES.ADD_MESSAGE_REPLY_MODAL_TITLE
    : TRANSLATION_GROUPS.MESSAGES.ADD_MESSAGE_MODAL_TITLE;

  return (
    <AddProjectModalContainer>
      <AddProjectModalHeader>
        <AddProjectModalTitle as="h2" variant="h2">
          {t(titleKey)}
        </AddProjectModalTitle>
      </AddProjectModalHeader>

      <AddProjectModalForm
        formId="add-project-message-form"
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
        >
          {t(TRANSLATION_GROUPS.MESSAGES.ADD_MESSAGE_MODAL_BTN)}
        </ModalButton>
      </AddProjectModalForm>
    </AddProjectModalContainer>
  );
}
