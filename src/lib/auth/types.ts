import type { z } from 'zod';
import type {
  loginSchema,
  registerSchema,
  socialRegisterSchema,
} from './validators';

export type Role = 'user' | 'admin';

export interface OAuthAccount {
  provider: 'google' | 'facebook' | 'credentials';
  providerAccountId: string;
}

export interface ProjectReference {
  id: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  providers: OAuthAccount[];
  cluster_projects: ProjectReference[];
  projects_limit: number;
  createdAt: string;
  updatedAt: string;
}

export type PublicUser = Omit<UserRecord, 'passwordHash' | 'providers'>;

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SocialRegisterInput = z.infer<typeof socialRegisterSchema>;
