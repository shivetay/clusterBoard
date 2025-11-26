import { StatusTagStyled } from './status-tag.styled';

type TStatusTagProps = 'zakończony' | 'w toku' | 'w przygotowaniu';

interface IStatusTagsProps {
  status: TStatusTagProps;
}

export function StatusTags({ status }: IStatusTagsProps) {
  return <StatusTagStyled label={status} />;
}
export default StatusTags;
