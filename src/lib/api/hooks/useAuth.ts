import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  loginUser,
  registerUser,
  logoutUser,
  getSession,
} from '../auth/auth.api';
import type { ILoginCredentials, IRegisterData } from '@/types';

/**
 * Hook to get current session
 */
export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook for user login
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: ILoginCredentials) => loginUser(credentials),
    onSuccess: (data) => {
      // Update session cache
      queryClient.setQueryData(['session'], data);
      queryClient.invalidateQueries({ queryKey: ['user'] });

      // Redirect to dashboard or home
      router.push('/');
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
}

/**
 * Hook for user registration
 */
export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IRegisterData) => registerUser(data),
    onSuccess: (data) => {
      // Update session cache
      queryClient.setQueryData(['session'], data);
      queryClient.invalidateQueries({ queryKey: ['user'] });

      // Redirect to dashboard or home
      router.push('/');
    },
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });
}

/**
 * Hook for user logout
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();

      // Redirect to login
      router.push('/login');
    },
    onError: (error) => {
      console.error('Logout error:', error);
    },
  });
}
