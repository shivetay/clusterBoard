import { CardActionArea, CardContent } from '@mui/material';
import { StatusTags } from '../tags';
import {
  CardContainer,
  CardWrapper,
  ProjectInfoContainer,
  ProjectInvestors,
  ProjectsCardWrapper,
  ProjectTitle,
} from './projects-card.styled';

interface IProjectsCardProps {
  color: string;
  project_name: string;
  investors: string[];
  id: string;
  project_status: 'zakończony' | 'w toku' | 'w przygotowaniu';
}

export function ProjectsCard({ ...props }: IProjectsCardProps) {
  const { id, color, project_name, investors, project_status } = props;
  return (
    <ProjectsCardWrapper href={`/project/${id}`}>
      <CardWrapper cardColor={color}>
        <CardActionArea>
          <CardContainer cardColor={color}>
            <CardContent>
              <ProjectTitle as="h1">{project_name}</ProjectTitle>
              <ProjectInfoContainer>
                <ProjectInvestors>
                  {investors.map((investor) => (
                    <span key={investor}>{investor}</span>
                  ))}
                </ProjectInvestors>
                <StatusTags status={project_status} />
              </ProjectInfoContainer>
            </CardContent>
          </CardContainer>
        </CardActionArea>
      </CardWrapper>
    </ProjectsCardWrapper>
  );
}

export default ProjectsCard;
