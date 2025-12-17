import z from 'zod';
import { TRANSLATIONS } from '@/locales';

const MAX_TASK_NAME_LENGTH = 25;

export const taskSchema = z.object({
  task_name: z
    .string()
    .min(1, TRANSLATIONS.ERROR_TASK_NAME)
    .max(MAX_TASK_NAME_LENGTH, TRANSLATIONS.ERROR_TASK_NAME_HELPER_TEXT)
    .trim(),
  is_done: z.boolean().default(false).optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
