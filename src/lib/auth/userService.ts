import { randomUUID } from 'node:crypto';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '@/lib/errors';
import { hashPassword, verifyPassword } from './password';
import type { PublicUser, SocialRegisterInput } from './types';
import { userRepository } from './userRepository';
import {
  loginSchema,
  registerSchema,
  socialRegisterSchema,
} from './validators';

export const sanitizeUser = (user: PublicUser | null) => user;

export const toPublicUser = (
  user: Awaited<ReturnType<typeof userRepository.findById>>,
): PublicUser => {
  if (!user) {
    throw new NotFoundError('User not found');
  }
  const { passwordHash: _passwordHash, providers: _providers, ...rest } = user;
  return rest;
};

export const registerUser = async (rawInput: unknown) => {
  const parsed = registerSchema.safeParse(rawInput);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors[0]?.message);
  }

  const existing = await userRepository.findByEmail(parsed.data.email);
  if (existing) {
    throw new ConflictError('Email is already registered');
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await userRepository.create({
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    passwordHash,
    role: 'user',
    cluster_projects: [],
    projects_limit: 5,
    providers: [
      {
        provider: 'credentials',
        providerAccountId: parsed.data.email.toLowerCase(),
      },
    ],
  });

  const { passwordHash: _hash, providers: _providers, ...publicUser } = user;
  return publicUser;
};

export const validateCredentials = async (rawInput: unknown) => {
  const parsed = loginSchema.safeParse(rawInput);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors[0]?.message);
  }

  const user = await userRepository.findByEmail(parsed.data.email);
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isValid = await verifyPassword(parsed.data.password, user.passwordHash);

  if (!isValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const {
    passwordHash: _passwordHash,
    providers: _providers,
    ...publicUser
  } = user;
  return publicUser;
};

export const createOrUpdateSocialUser = async (
  rawInput: SocialRegisterInput,
) => {
  const parsed = socialRegisterSchema.safeParse(rawInput);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.errors[0]?.message);
  }

  const existing = await userRepository.findByEmail(parsed.data.email);

  if (existing) {
    const updated = await userRepository.linkOAuthAccount(existing.id, {
      provider: parsed.data.provider,
      providerAccountId: parsed.data.providerAccountId,
    });
    const {
      passwordHash: _passwordHash,
      providers: _providers,
      ...publicUser
    } = updated;
    return publicUser;
  }

  const passwordHash = await hashPassword(randomUUID());
  const created = await userRepository.create({
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    passwordHash,
    role: 'user',
    cluster_projects: [],
    projects_limit: 5,
    providers: [
      {
        provider: parsed.data.provider,
        providerAccountId: parsed.data.providerAccountId,
      },
    ],
  });

  const { passwordHash: _hash, providers: _providers, ...publicUser } = created;
  return publicUser;
};

export const findPublicUserById = async (id: string) => {
  const user = await userRepository.findById(id);
  if (!user) {
    return null;
  }

  const {
    passwordHash: _passwordHash,
    providers: _providers,
    ...publicUser
  } = user;
  return publicUser;
};
