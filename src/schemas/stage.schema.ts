import { z } from 'zod';
import { TRANSLATION_GROUPS } from '@/locales';

const MAX_STAGE_NAME_LENGTH = 10;
const MAX_STAGE_DESCRIPTION_LENGTH = 25;

/**
 * Schema for stage task validation
 */

export const stageTaskSchema = z.object({
  task_name: z
    .string()
    .min(1, TRANSLATION_GROUPS.ERRORS.ERROR_TASK_NAME)
    .max(
      MAX_STAGE_DESCRIPTION_LENGTH,
      TRANSLATION_GROUPS.ERRORS.ERROR_TASK_NAME_HELPER_TEXT,
    )
    .trim(),

  is_done: z.boolean().default(false),
});

/**
 * Schema for stage form validation
 * Validates stage creation form data
 */

export const stageFormSchema = z.object({
  stage_name: z
    .string()
    .min(1, TRANSLATION_GROUPS.ERRORS.ERROR_STAGE_NAME)
    .max(
      MAX_STAGE_NAME_LENGTH,
      TRANSLATION_GROUPS.ERRORS.ERROR_STAGE_NAME_HELPER_TEXT,
    )
    .trim(),

  stage_description: z
    .string()
    .max(
      MAX_STAGE_DESCRIPTION_LENGTH,
      TRANSLATION_GROUPS.ERRORS.ERROR_STAGE_DESCRIPTION_HELPER_TEXT,
    ),
});

/**
 * Infer TypeScript type from schema
 * This replaces your existing TStageFormData type
 */
export type StageFormData = z.infer<typeof stageFormSchema>;
