import { Chip } from '@mui/material';

type TStatusTagProps = 'zakończony' | 'w toku' | 'w przygotowaniu';
type TStausTagColor = 'primary' | 'success' | 'warning' | 'error';

interface IStatusTagsProps {
  status: TStatusTagProps;
}

export function StatusTags({ status }: IStatusTagsProps) {
  const getTagColor = (): TStausTagColor => {
    switch (status) {
      case 'zakończony':
        return 'success';

      case 'w toku':
        return 'primary';

      case 'w przygotowaniu':
        return 'warning';

      default:
        return 'error';
    }
  };

  const tagColor = getTagColor();

  return <Chip label={status} color={tagColor} />;
}
export default StatusTags;
