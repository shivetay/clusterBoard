'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import {
  serverDelete,
  serverGet,
  serverPatch,
  serverPost,
} from '@/lib/api/projects';
import type { ActionResult } from '@/types/actions';
import type {
  TProjectMessagesListResponse,
  TPublicProjectMessage,
} from '@/types/project-message.type';
import { handleActionError } from '../utils';

export async function getProjectMessagesAction(
  projectId: string,
): Promise<ActionResult<TPublicProjectMessage[]>> {
  try {
    const response = await serverGet<TProjectMessagesListResponse>(
      `/projects/${projectId}/messages`,
    );
    const messages = response.data?.messages ?? [];
    return { success: true, data: messages };
  } catch (error) {
    return {
      success: false,
      error: handleActionError(error),
    };
  }
}

export async function createProjectMessageAction(
  projectId: string,
  body: string,
  parent_message_id: string | null = null,
): Promise<ActionResult<void>> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const trimmed = body?.trim();
    if (!trimmed) {
      return { success: false, error: 'Message body is required' };
    }

    await serverPost(`/projects/${projectId}/messages`, {
      body: trimmed,
      parent_message_id,
    });

    revalidatePath(`/project/${projectId}/messages`);

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: handleActionError(error),
    };
  }
}

export async function updateProjectMessageAction(
  projectId: string,
  messageId: string,
  body: string,
): Promise<ActionResult<void>> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const trimmed = body?.trim();
    if (!trimmed) {
      return { success: false, error: 'Message body is required' };
    }

    await serverPatch(`/projects/${projectId}/messages/${messageId}`, {
      body: trimmed,
    });

    revalidatePath(`/project/${projectId}/messages`);

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: handleActionError(error),
    };
  }
}

export async function deleteProjectMessageAction(
  projectId: string,
  messageId: string,
): Promise<ActionResult<void>> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    await serverDelete(`/projects/${projectId}/messages/${messageId}`);

    revalidatePath(`/project/${projectId}/messages`);

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: handleActionError(error),
    };
  }
}
