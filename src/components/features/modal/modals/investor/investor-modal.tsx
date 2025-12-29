'use client';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInput, Loader } from '@/components/ui';
import { useSendInvitation } from '@/lib';
import { TRANSLATIONS } from '@/locales';
import { useModal } from '@/providers';
import {
  AddProjectModalContainer,
  AddProjectModalForm,
  AddProjectModalHeader,
  AddProjectModalTitle,
  ModalButton,
} from '../../modal.styled';

interface IInvestorModalProps {
  projectId: string;
}

export function InvestorModal({ projectId }: IInvestorModalProps) {
  const { t } = useTranslation();
  const { setIsOpen } = useModal();
  const { sendInvitation, isPending } = useSendInvitation();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      investor_email: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleInvestorInvite = (data: { investor_email: string }) => {
    const invitee_email = data.investor_email;
    const dataToSend = {
      invitee_email,
      project_id: projectId,
    };
    sendInvitation(dataToSend);
  };

  const isDisabled =
    Object.keys(errors).length > 0 || watch('investor_email') === '';

  return (
    <AddProjectModalContainer>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <AddProjectModalHeader>
            <AddProjectModalTitle as="h2" variant="h2">
              {t(TRANSLATIONS.ADD_INVESTOR)}
            </AddProjectModalTitle>
          </AddProjectModalHeader>
          <AddProjectModalForm
            formId="add-investor-form"
            onSubmit={handleSubmit(handleInvestorInvite)}
          >
            <FormInput
              {...register('investor_email', {
                required: 'required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t(TRANSLATIONS.EMAIL_ERROR),
                },
              })}
              name="investor_email"
              label={t(TRANSLATIONS.INVESTOR_EMAIL)}
              type="email"
              error={errors.investor_email?.message}
            />
            <Box display="flex" flexDirection="row" gap={2} width="100%">
              <ModalButton
                onClick={() => setIsOpen(false)}
                variant="outlined"
                color="secondary"
              >
                {t(TRANSLATIONS.CANCEL)}
              </ModalButton>
              <ModalButton
                type="submit"
                variant="contained"
                color="primary"
                disabled={isDisabled}
              >
                {t(TRANSLATIONS.ADD_INVESTOR_BTN)}
              </ModalButton>
            </Box>
          </AddProjectModalForm>
        </>
      )}
    </AddProjectModalContainer>
  );
}

export default InvestorModal;
