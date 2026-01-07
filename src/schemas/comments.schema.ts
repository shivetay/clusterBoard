import z from 'zod';
import { TRANSLATIONS } from '@/locales';

const MAX_COMMENT_TEXT_LENGTH = 150;

export const commentSchema = z.object({
  id: z.string().optional(),
  comment_text: z
    .string()
    .min(1, TRANSLATIONS.ERROR_COMMENT_TEXT)
    .max(MAX_COMMENT_TEXT_LENGTH, TRANSLATIONS.ERROR_COMMENT_TEXT_HELPER_TEXT)
    .trim(),

  is_edited: z.boolean().default(false),
});

export type CommentFormData = z.infer<typeof commentSchema>;
