import type { IUserData } from './user.type';

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IAuthResponse {
  success: boolean;
  message?: string;
  user?: IUserData;
  token?: string;
  refreshToken?: string;
}

export interface ISessionUser extends IUserData {
  accessToken?: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IJWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
