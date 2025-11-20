import apiClient from '../apiClient';
import type { ILoginCredentials, IRegisterData, IAuthResponse } from '@/types';

/**
 * Authentication API functions
 * These functions interact with the backend authentication endpoints
 */

/**
 * Login user with email and password
 */
export async function loginUser(
  credentials: ILoginCredentials,
): Promise<IAuthResponse> {
  const response = await apiClient.post<IAuthResponse>(
    '/api/auth/login',
    credentials,
  );
  return response.data;
}

/**
 * Register new user
 */
export async function registerUser(
  data: IRegisterData,
): Promise<IAuthResponse> {
  const response = await apiClient.post<IAuthResponse>(
    '/api/auth/register',
    data,
  );
  return response.data;
}

/**
 * Logout current user
 */
export async function logoutUser(): Promise<{ success: boolean }> {
  const response = await apiClient.post<{ success: boolean }>(
    '/api/auth/logout',
  );
  return response.data;
}

/**
 * Get current session
 */
export async function getSession(): Promise<IAuthResponse> {
  const response = await apiClient.get<IAuthResponse>('/api/auth/session');
  return response.data;
}

/**
 * Refresh access token
 */
export async function refreshToken(): Promise<IAuthResponse> {
  const response = await apiClient.post<IAuthResponse>('/api/auth/refresh');
  return response.data;
}
