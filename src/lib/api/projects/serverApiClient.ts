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
    const response = await (await getServerApiClient(config)).get<T>(url);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch ${url}: ${error.message}`);
    }
    throw new Error(`Failed to fetch ${url}`);
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
    const response = await (await getServerApiClient(config)).post<T>(
      url,
      data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to post to ${url}: ${error.message}`);
    }
    throw new Error(`Failed to post to ${url}`);
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
    const response = await (await getServerApiClient(config)).put<T>(url, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to put to ${url}: ${error.message}`);
    }
    throw new Error(`Failed to put to ${url}`);
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
    const response = await (await getServerApiClient(config)).delete<T>(url);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete ${url}: ${error.message}`);
    }
    throw new Error(`Failed to delete ${url}`);
  }
}
