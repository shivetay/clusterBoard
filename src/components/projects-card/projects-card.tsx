import { CardActionArea, CardContent } from '@mui/material';
import Link from 'next/link';
import { CardContainer, CardWrapper } from './projects-card.styled';

interface IProjectsCardProps {
  color: string;
  project_name: string;
  investors: [string];
  href: string;
  project_status: 'zakończony' | 'w toku' | 'w przygotowaniu';
}

export function ProjectsCard({ ...props }: IProjectsCardProps) {
  const { href, color } = props;
  return (
    <Link href={href}>
      <CardWrapper cardColor={color}>
        <CardActionArea>
          <CardContainer cardColor={color}>
            <CardContent></CardContent>
          </CardContainer>
        </CardActionArea>
      </CardWrapper>
    </Link>
  );
}

export default ProjectsCard;
