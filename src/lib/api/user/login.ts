'use client';

import { signIn, signOut } from 'next-auth/react';

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const result = await signIn('credentials', {
    redirect: false,
    email: payload.email,
    password: payload.password,
  });

  if (!result || result.error) {
    throw new Error(
      result?.error || 'Unable to login with provided credentials',
    );
  }

  return result;
};

export const logoutUser = async () => {
  await signOut({ redirect: false });
};
