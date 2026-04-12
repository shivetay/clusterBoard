'use client';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { type FilesViewMode, filesViewQuery } from '@/lib/pagination/constants';
import { TRANSLATIONS } from '@/locales';

type ListGridViewToggleProps = {
  viewMode: FilesViewMode;
};

export function ListGridViewToggle({ viewMode }: ListGridViewToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const handleViewChange = (
    _event: MouseEvent<HTMLElement>,
    nextView: FilesViewMode | null,
  ) => {
    if (!nextView) return;
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.set(filesViewQuery.view, nextView);
    nextSearchParams.set(filesViewQuery.page, '1');
    const query = nextSearchParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={viewMode}
      onChange={handleViewChange}
      aria-label={t(TRANSLATIONS.LIST_GRID_VIEW_TOGGLE_ARIA)}
      size="small"
      sx={{ mb: 2 }}
    >
      <ToggleButton value="list">
        {t(TRANSLATIONS.FILES_VIEW_MODE_LIST)}
      </ToggleButton>
      <ToggleButton value="grid">
        {t(TRANSLATIONS.FILES_VIEW_MODE_GRID)}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
