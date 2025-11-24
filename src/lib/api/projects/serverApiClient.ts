import { auth } from '@clerk/nextjs/server';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Creates an authenticated axios instance for server-side API calls.
 * Automatically fetches and includes the Clerk authentication token.
 *
 * @param customConfig - Optional axios request configuration
 * @returns Promise resolving to an axios instance with authentication headers
 *
 * @example
 * ```typescript
 * const client = await getServerApiClient();
 * const response = await client.get('/projects/123');
 * ```
 */
export async function getServerApiClient(
  customConfig?: AxiosRequestConfig,
): Promise<AxiosInstance> {
  const { getToken } = await auth();
  const token = await getToken();

  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    ...customConfig,
    headers: {
      ...customConfig?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  return axios.create(config);
}

/**
 * Helper function to make authenticated GET requests from server components.
 *
 * @param url - API endpoint URL
 * @param config - Optional axios request configuration
 * @returns Promise resolving to the response data
 */
export async function serverGet<T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    return (await getServerApiClient(config)).get(url);
  } catch (error) {
    throw new Error('Failed to get project');
  }
}

/**
 * Helper function to make authenticated POST requests from server components.
 *
 * @param url - API endpoint URL
 * @param data - Request body data
 * @param config - Optional axios request configuration
 * @returns Promise resolving to the response data
 */
export async function serverPost<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    return (await getServerApiClient(config)).post(url, data);
  } catch (error) {
    throw new Error('Failed to post project');
  }
}

/**
 * Helper function to make authenticated PUT requests from server components.
 *
 * @param url - API endpoint URL
 * @param data - Request body data
 * @param config - Optional axios request configuration
 * @returns Promise resolving to the response data
 */
export async function serverPut<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    return (await getServerApiClient(config)).put(url, data);
  } catch (error) {
    throw new Error('Failed to put project');
  }
}

/**
 * Helper function to make authenticated DELETE requests from server components.
 *
 * @param url - API endpoint URL
 * @param config - Optional axios request configuration
 * @returns Promise resolving to the response data
 */
export async function serverDelete<T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    return (await getServerApiClient(config)).delete(url);
  } catch (error) {
    throw new Error('Failed to delete project');
  }
}
