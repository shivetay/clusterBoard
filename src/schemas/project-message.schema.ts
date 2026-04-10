import z from 'zod';
import { TRANSLATIONS } from '@/locales';

const MAX_MESSAGE_BODY_LENGTH = 5000;

export const projectMessageBodySchema = z.object({
  body: z
    .string()
    .min(1, TRANSLATIONS.ERROR_MESSAGE_BODY)
    .max(MAX_MESSAGE_BODY_LENGTH, TRANSLATIONS.ERROR_MESSAGE_BODY_MAX)
    .trim(),
});

export type ProjectMessageFormData = z.infer<typeof projectMessageBodySchema>;
