/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
import { Box, ListItem, styled } from '@mui/material';
import { glassEffects } from '@/theme';

export const FileListItem = styled(ListItem)(() => ({
  ...glassEffects.medium,
}));

/** Grid / non-list layout: same look as {@link FileListItem} without `<li>` semantics. */
export const FileGridCard = styled(Box)(({ theme }) => ({
  ...glassEffects.medium,
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
}));

export const DragContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDragActive',
})<{ isDragActive: boolean }>(({ theme, isDragActive }) => ({
  border: '2px dashed',
  borderColor: isDragActive
    ? theme.palette.primary.main
    : theme.palette.grey[300],
  borderRadius: 2,
  p: 3,
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: isDragActive
    ? theme.palette.background.bgLight
    : theme.palette.background.paper,
  transition: 'all 0.2s',
  padding: theme.spacing(3),
}));
