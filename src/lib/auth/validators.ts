import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 60;
const PASSWORD_MIN_LENGTH = 8;

export const registerSchema = z.object({
  name: z.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH),
  email: z.string().email(),
  password: z.string().regex(passwordRegex, {
    message:
      'Password must be at least 8 characters and include upper, lower, number, and symbol.',
  }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
});

export const socialRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  provider: z.enum(['google', 'facebook']),
  providerAccountId: z.string().min(1),
});
