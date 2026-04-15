'use client';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserProjects, userProjectsListFetchLimit } from '@/lib';
import { TRANSLATION_GROUPS } from '@/locales';
import { useNavigation } from '@/providers';
import {
  MenuButton,
  MenuContainer,
  MobileProjectMenuStrip,
  NavLinkContainer,
} from './menu.styled';
import { MENU_ITEM_LIST } from './menu-utils';
import { useProjectMenuOwner } from './use-project-menu-owner';

const MENU_ICON_MARGIN_BOTTOM = 0.25;

export function Menu() {
  const { setActiveElement, isItemActive, menuItems, pathname } =
    useNavigation();
  const { t } = useTranslation();
  const { data: userProjects } = useGetUserProjects(1, {
    itemsPerPage: userProjectsListFetchLimit,
  });

  const isOwner = useProjectMenuOwner(pathname, userProjects);

  // Extract project ID from pathname for dynamic routes
  const currentProjectId = useMemo(() => {
    const projectIdMatch = pathname.match(/^\/project\/([^/]+)/);
    return projectIdMatch ? projectIdMatch[1] : null;
  }, [pathname]);

  const isProjectRoute = Boolean(currentProjectId);

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

  const renderMenuLink = (
    item: (typeof filteredMenuItems)[number],
    layout: 'desktopBar' | 'mobileStrip',
  ) => {
    if (item.href.includes('[id]')) {
      return null;
    }

    const isActive = isItemActive(item.href);
    const isStrip = layout === 'mobileStrip';

    return (
      <NavLinkContainer
        key={item.id}
        href={item.href}
        sx={
          isStrip
            ? {
                width: '100%',
                minWidth: 0,
                display: 'block',
                textDecoration: 'none',
                padding: 0,
              }
            : { textDecoration: 'none' }
        }
      >
        <MenuButton
          onClick={() => setActiveElement(item.id)}
          active={isActive}
          startIcon={item.icon}
          sx={
            isStrip
              ? (theme) => ({
                  width: '100%',
                  minWidth: 0,
                  whiteSpace: 'normal',
                  textAlign: 'center',
                  py: 0.75,
                  px: 0.5,
                  flexDirection: 'column',
                  fontSize: theme.typography.caption.fontSize,
                  lineHeight: theme.typography.caption.lineHeight,
                  '& .MuiButton-startIcon': {
                    margin: 0,
                    marginBottom: theme.spacing(MENU_ICON_MARGIN_BOTTOM),
                  },
                })
              : undefined
          }
        >
          {t(item.label)}
        </MenuButton>
      </NavLinkContainer>
    );
  };

  return (
    <>
      <MenuContainer>
        {filteredMenuItems.map((item) => renderMenuLink(item, 'desktopBar'))}
      </MenuContainer>
      {isProjectRoute ? (
        <MobileProjectMenuStrip
          aria-label={t(TRANSLATION_GROUPS.PROJECTS.PROJECT_PAGES_NAV_ARIA)}
        >
          {filteredMenuItems.map((item) => renderMenuLink(item, 'mobileStrip'))}
        </MobileProjectMenuStrip>
      ) : null}
    </>
  );
}

export default Menu;
