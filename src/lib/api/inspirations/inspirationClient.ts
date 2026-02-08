'use server';
import type { TInspirationListResponse } from '@/types';
import { serverGet } from '../projects';

export async function getProjectInspirationsAction(projectId: string) {
  try {
    const response = await serverGet<TInspirationListResponse>(
      `/inspirations/project/${projectId}`,
    );

    const inspirations = response.data?.inspirations || [];
    return { success: true, data: inspirations };
  } catch (error) {
    return { success: false, error };
  }
}
