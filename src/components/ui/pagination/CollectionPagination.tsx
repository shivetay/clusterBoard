'use client';

import { Pagination, Stack, Typography } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_GROUPS } from '@/locales';
import type { PaginationMeta } from '@/types';

type CollectionPaginationProps = {
  pagination: PaginationMeta;
};

export function CollectionPagination({
  pagination,
}: CollectionPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  if (pagination.totalPages <= 1) {
    return null;
  }

  const handlePageChange = (_event: unknown, page: number) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.set('page', String(page));
    const query = nextSearchParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <Stack spacing={1} sx={{ mt: 3, alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary" component="p">
        {t(TRANSLATION_GROUPS.COMMON.PAGINATION_PAGE_SUMMARY, {
          current: pagination.currentPage,
          total: pagination.totalPages,
          count: pagination.totalItems,
        })}
      </Typography>
      <Pagination
        count={pagination.totalPages}
        page={pagination.currentPage}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
        aria-label={t(TRANSLATION_GROUPS.COMMON.PAGINATION_ARIA)}
      />
    </Stack>
  );
}
