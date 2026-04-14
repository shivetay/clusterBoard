import z from 'zod';
import { TRANSLATION_GROUPS } from '@/locales';

const MAX_MESSAGE_BODY_LENGTH = 5000;

export const projectMessageBodySchema = z.object({
  body: z
    .string()
    .min(1, TRANSLATION_GROUPS.ERRORS.ERROR_MESSAGE_BODY)
    .max(
      MAX_MESSAGE_BODY_LENGTH,
      TRANSLATION_GROUPS.ERRORS.ERROR_MESSAGE_BODY_MAX,
    )
    .trim(),
});

export type ProjectMessageFormData = z.infer<typeof projectMessageBodySchema>;
