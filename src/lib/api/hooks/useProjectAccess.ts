'use client';

import { useAuth } from '@clerk/nextjs';
import { useMemo } from 'react';
import { useUser } from '@/stores';
import type { IProjectData } from '@/types';

interface UseProjectAccessResult {
  hasAccess: boolean;
  isOwner: boolean;
  isInvestor: boolean;
  accessLevel: 'owner' | 'investor' | 'none';
  canEdit: boolean;
  canDelete: boolean;
  canInvite: boolean;
}

export function useProjectAccess(
  project: IProjectData | null | undefined,
): UseProjectAccessResult {
  const { userInfo } = useUser();
  const { userId } = useAuth();

  return useMemo(() => {
    // Default values when no project or user
    if (!project || !userId || !userInfo) {
      return {
        hasAccess: false,
        isOwner: false,
        isInvestor: false,
        accessLevel: 'none' as const,
        canEdit: false,
        canDelete: false,
        canInvite: false,
      };
    }

    // Use server-provided access level if available
    if (project.user_access) {
      const accessLevel = project.user_access;
      const isOwner = accessLevel === 'owner';
      const isInvestor = accessLevel === 'investor';

      return {
        hasAccess: isOwner || isInvestor,
        isOwner,
        isInvestor,
        accessLevel,
        canEdit: isOwner,
        canDelete: isOwner,
        canInvite: isOwner,
      };
    }

    // Fallback: Calculate access level client-side
    const isOwner = project.is_owner;
    // ✅ Check project-specific investor status
    const isInvestor = project.is_investor;
    const hasAccess = isOwner || isInvestor;

    return {
      hasAccess,
      isOwner,
      isInvestor,
      accessLevel: (isOwner ? 'owner' : isInvestor ? 'investor' : 'none') as
        | 'owner'
        | 'investor'
        | 'none',
      canEdit: isOwner,
      canDelete: isOwner,
      canInvite: isOwner,
    };
  }, [project, userId, userInfo]);
}
