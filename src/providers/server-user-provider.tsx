import { currentUser } from '@clerk/nextjs/server';
import { serverGet } from '@/lib/api/projects/serverApiClient';
import type { IUserData } from '@/types';
import { UserProviderClient } from './user-provider';

export async function ServerUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const userId = user?.id;

  let userData: IUserData | null = null;

  if (userId) {
    try {
      const response = await serverGet<{ data: { user: IUserData } }>(
        `/users/${userId}`,
      );

      if (response.data) {
        const rawUser = response.data.user || response.data;
        if (rawUser) {
          userData = {
            id: userId || rawUser.id,
            name: rawUser.name,
            email: rawUser.email,
            role: rawUser.role,
            cluster_projects: rawUser.cluster_projects || [],
            projects_limit: rawUser.projects_limit || 0,
          };
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }

  return (
    <UserProviderClient initialUserData={userData}>
      {children}
    </UserProviderClient>
  );
}
