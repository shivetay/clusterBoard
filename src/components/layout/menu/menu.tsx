'use client';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserProjects } from '@/lib';
import { useNavigation } from '@/providers';
import { MenuButton, MenuContainer, NavLinkContainer } from './menu.styled';
import { MENU_ITEM_LIST } from './menu-utils';

export function Menu() {
  const { setActiveElement, isItemActive, menuItems, pathname } =
    useNavigation();
  const { t } = useTranslation();
  const { data: userProjects } = useGetUserProjects();

  const isOwner = useMemo(() => {
    if (!userProjects) return false;

    // Extract project ID from pathname if we're on a project detail page
    const projectIdMatch = pathname.match(/^\/project\/([^/]+)/);
    if (projectIdMatch) {
      const currentProjectId = projectIdMatch[1];
      // Find the specific project being viewed
      const currentProject = userProjects.find(
        (project) => project.id === currentProjectId,
      );
      // Check if user is owner of THIS specific project
      return (
        currentProject?.is_owner || currentProject?.user_access === 'owner'
      );
    }

    // For other pages (e.g., /projects list), check if user is owner of ANY project
    return userProjects.some(
      (project) => project.is_owner || project.user_access === 'owner',
    );
  }, [userProjects, pathname]);

  // Extract project ID from pathname for dynamic routes
  const currentProjectId = useMemo(() => {
    const projectIdMatch = pathname.match(/^\/project\/([^/]+)/);
    return projectIdMatch ? projectIdMatch[1] : null;
  }, [pathname]);

  const filteredMenuItems = useMemo(
    () =>
      MENU_ITEM_LIST.filter((item) =>
        Array.isArray(item.type)
          ? item.type.includes(menuItems)
          : item.type === menuItems,
      )
        .filter((item) => {
          if (item.onlyOwner) {
            return isOwner;
          }
          return true;
        })
        .map((item) => {
          // Replace [id] placeholder with actual project ID for project-specific routes
          const href =
            currentProjectId && item.href.includes('[id]')
              ? item.href.replace('[id]', currentProjectId)
              : item.href;
          return { ...item, href };
        }),
    [menuItems, isOwner, currentProjectId],
  );

  // Set active element based on current pathname
  useEffect(() => {
    const activeItem = filteredMenuItems.find((item) =>
      isItemActive(item.href),
    );
    const newActiveId = activeItem?.id ?? null;
    setActiveElement(newActiveId);
  }, [filteredMenuItems, isItemActive, setActiveElement]);

  return (
    <MenuContainer>
      {filteredMenuItems.map((item) => {
        // Skip rendering links that still have [id] placeholder (no project ID available)
        if (item.href.includes('[id]')) {
          return null;
        }

        const isActive = isItemActive(item.href);

        return (
          <NavLinkContainer key={item.id} href={item.href}>
            <MenuButton
              onClick={() => setActiveElement(item.id)}
              active={isActive}
              startIcon={item.icon}
              key={item.id}
            >
              {t(item.label)}
            </MenuButton>
          </NavLinkContainer>
        );
      })}
    </MenuContainer>
  );
}

export default Menu;
