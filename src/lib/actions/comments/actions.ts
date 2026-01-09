'use server';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { serverDelete, serverPatch, serverPost } from '@/lib/api/projects';
import type { ActionResult } from '@/types/actions';
import { handleActionError } from '../utils';

export async function createComment(
  formData: FormData,
  stageId: string,
  taskId: string,
): Promise<ActionResult<void>> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const commentText = formData.get('comment_text') as string;

    if (!commentText || commentText.trim().length === 0) {
      return { success: false, error: 'Comment text is required' };
    }

    const commentData = {
      comment_text: commentText.trim(),
    };

    await serverPost(`/comments/${stageId}/add/${taskId}`, commentData);

    revalidatePath('/project/[id]');

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: handleActionError(error),
    };
  }
}

export async function deleteComment(
  commentId: string,
): Promise<ActionResult<void>> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    await serverDelete(`/comments/${commentId}`);

    revalidatePath('/project/[id]');

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: handleActionError(error),
    };
  }
}

export async function editComment(
  commentId: string,
  commentText: string,
): Promise<ActionResult<void>> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    if (!commentId || commentId.trim().length === 0) {
      return { success: false, error: 'Comment ID is required' };
    }

    if (!commentText || commentText.trim().length === 0) {
      return { success: false, error: 'Comment text is required' };
    }

    await serverPatch(`/comments/${commentId}`, {
      comment_text: commentText.trim(),
    });

    revalidatePath('/project/[id]');

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: handleActionError(error),
    };
  }
}
