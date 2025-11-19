import { Box, CardActionArea } from '@mui/material';
import Link from 'next/link';
import { StatusTags } from '../tags';
import {
  CardContainer,
  ProjectCardContent,
  ProjectInfoContainer,
  ProjectInvestors,
  ProjectTitle,
  ProjectTitleContainer,
} from './projects-card.styled';

interface IProjectsCardProps {
  project_name: string;
  investors: string[];
  id: string;
  project_status: 'zakończony' | 'w toku' | 'w przygotowaniu';
}

export function ProjectsCard({ ...props }: IProjectsCardProps) {
  const { id, project_name, investors, project_status } = props;
  return (
    <Link href={`/project/${id}`}>
      <Box>
        <CardActionArea>
          <CardContainer>
            <ProjectCardContent>
              <ProjectTitleContainer>
                <ProjectTitle variant="h3" as="h1">
                  {project_name}
                </ProjectTitle>
                <StatusTags status={project_status} />
              </ProjectTitleContainer>
              <ProjectInfoContainer>
                <ProjectInvestors>
                  {investors.map((investor) => (
                    <span key={investor}>{investor}</span>
                  ))}
                </ProjectInvestors>
              </ProjectInfoContainer>
            </ProjectCardContent>
          </CardContainer>
        </CardActionArea>
      </Box>
    </Link>
  );
}

export default ProjectsCard;
