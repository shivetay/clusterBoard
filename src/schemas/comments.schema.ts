import z from 'zod';
import { TRANSLATION_GROUPS } from '@/locales';

const MAX_COMMENT_TEXT_LENGTH = 50;

export const commentSchema = z.object({
  id: z.string().optional(),
  comment_text: z
    .string()
    .min(1, TRANSLATION_GROUPS.ERRORS.ERROR_COMMENT_TEXT)
    .max(
      MAX_COMMENT_TEXT_LENGTH,
      TRANSLATION_GROUPS.ERRORS.ERROR_COMMENT_TEXT_HELPER_TEXT,
    )
    .trim(),

  is_edited: z.boolean().default(false),
});

export type CommentFormData = z.infer<typeof commentSchema>;
