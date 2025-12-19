import { StatusTagStyled } from './status-tag.styled';

type TStatusTagProps = 'zakończony' | 'w toku' | 'w przygotowaniu';

interface IStatusTagsProps {
  status?: TStatusTagProps;
  investor?: string;
}

export function StatusTags({ status, investor }: IStatusTagsProps) {
  const tagLabel = investor || status;

  return <StatusTagStyled label={tagLabel} />;
}
export default StatusTags;
