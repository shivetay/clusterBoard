import { z } from 'zod';
import { TRANSLATION_GROUPS } from '@/locales';

const MIN_PROJ_NAME_LENGTH = 5;
const MAX_PROJ_NAME_LENGTH = 25;
const MIN_PROJ_DESCRIPTION_LENGTH = 5;
const MAX_PROJ_DESCRIPTION_LENGTH = 250;

const projectFormObjectSchema = z.object({
  project_name: z
    .string()
    .min(MIN_PROJ_NAME_LENGTH, TRANSLATION_GROUPS.ERRORS.ERROR_PROJECT_NAME)
    .max(
      MAX_PROJ_NAME_LENGTH,
      TRANSLATION_GROUPS.ERRORS.ERROR_PROJECT_NAME_HELPER_TEXT,
    )
    .trim(),

  project_description: z
    .string()
    .min(
      MIN_PROJ_DESCRIPTION_LENGTH,
      TRANSLATION_GROUPS.ERRORS.ERROR_PROJECT_DESCRIPTION_MIN,
    )
    .max(
      MAX_PROJ_DESCRIPTION_LENGTH,
      TRANSLATION_GROUPS.ERRORS.ERROR_PROJECT_DESCRIPTION_HELPER_TEXT,
    )
    .optional()
    .or(z.literal('')),

  owner: z.object({
    owner_id: z.string(),
    owner_name: z.string(),
  }),

  start_date: z
    .string()
    .min(1, TRANSLATION_GROUPS.ERRORS.ERROR_START_DATE)
    .refine(
      (date) => {
        // Validate YYYY-MM-DD format
        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateFormatRegex.test(date)) {
          return false;
        }
        const parsedDate = new Date(date);
        return !Number.isNaN(parsedDate.getTime());
      },
      { message: TRANSLATION_GROUPS.ERRORS.ERROR_WRONG_DATE_FORMAT },
    )
    .optional()
    .or(z.literal('')),
  end_date: z
    .string()
    .refine(
      (date) => {
        if (!date) return true; // Allow empty strings
        // Validate YYYY-MM-DD format
        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateFormatRegex.test(date)) {
          return false;
        }
        const parsedDate = new Date(date);
        return !Number.isNaN(parsedDate.getTime());
      },
      { message: TRANSLATION_GROUPS.ERRORS.ERROR_WRONG_DATE_FORMAT },
    )
    .optional()
    .or(z.literal('')),
});

const projectDateOrderRefine = (data: {
  start_date?: string | '' | undefined;
  end_date?: string | '' | undefined;
}) => {
  if (!data.start_date || !data.end_date) {
    return true;
  }
  const start = new Date(data.start_date);
  const end = new Date(data.end_date);
  return end >= start;
};

const projectDateOrderRefineParams = {
  message: TRANSLATION_GROUPS.ERRORS.ERROR_END_DATE_HELPER_TEXT,
  path: ['end_date'],
};

export const createProjectSchema = projectFormObjectSchema.refine(
  projectDateOrderRefine,
  projectDateOrderRefineParams,
);

export const editProjectSchema = projectFormObjectSchema
  .partial()
  .refine(projectDateOrderRefine, projectDateOrderRefineParams);

export type ProjectFormData = z.infer<typeof createProjectSchema>;
export type EditProjectFormData = z.infer<typeof editProjectSchema>;
