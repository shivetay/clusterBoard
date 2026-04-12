'use client';

import { useMemo } from 'react';
import type { IProjectData } from '@/types';

/**
 * Whether the current user is owner of the project in the URL path, or owns any project (non-project routes).
 */
export function useProjectMenuOwner(
  pathname: string,
  userProjects: IProjectData[] | undefined,
): boolean {
  return useMemo(() => {
    if (!userProjects) return false;

    const projectIdMatch = pathname.match(/^\/project\/([^/]+)/);
    if (projectIdMatch) {
      const currentProjectId = projectIdMatch[1];
      const currentProject = userProjects.find(
        (project) => project.id === currentProjectId,
      );
      return (
        currentProject?.is_owner || currentProject?.user_access === 'owner'
      );
    }

    return userProjects.some(
      (project) => project.is_owner || project.user_access === 'owner',
    );
  }, [userProjects, pathname]);
}
