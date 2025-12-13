import { z } from 'zod';
import { TRANSLATIONS } from '@/locales';

const MIN_PROJ_NAME_LENGTH = 1;
const MAX_PROJ_NAME_LENGTH = 25;
const MAX_PROJ_DESCRIPTION_LENGTH = 250;

export const createProjectSchema = z
  .object({
    project_name: z
      .string()
      .min(MIN_PROJ_NAME_LENGTH, TRANSLATIONS.ERROR_PROJECT_NAME)
      .max(MAX_PROJ_NAME_LENGTH, TRANSLATIONS.ERROR_PROJECT_NAME_HELPER_TEXT)
      .trim(),

    project_description: z
      .string()
      .max(
        MAX_PROJ_DESCRIPTION_LENGTH,
        TRANSLATIONS.ERROR_PROJECT_DESCRIPTION_HELPER_TEXT,
      )
      .optional()
      .or(z.literal('')),

    owner: z.string(),

    start_date: z
      .string()
      .min(1, TRANSLATIONS.ERROR_START_DATE)
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
        { message: TRANSLATIONS.ERROR_WRONG_DATE_FORMAT },
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
        { message: TRANSLATIONS.ERROR_WRONG_DATE_FORMAT },
      )
      .optional()
      .or(z.literal('')),
  })
  .refine(
    (data) => {
      // Skip validation if either date is empty
      if (!data.start_date || !data.end_date) {
        return true;
      }
      const start = new Date(data.start_date as string);
      const end = new Date(data.end_date as string);
      return end >= start;
    },
    {
      message: TRANSLATIONS.ERROR_END_DATE_HELPER_TEXT,
      path: ['end_date'], // Error will appear on end_date field
    },
  );

export const editProjectSchema = createProjectSchema.partial();

export type ProjectFormData = z.infer<typeof createProjectSchema>;
export type EditProjectFormData = z.infer<typeof editProjectSchema>;
