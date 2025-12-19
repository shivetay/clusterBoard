'use client';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { Box, CardActionArea, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HexDecor } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { TRANSLATIONS } from '@/locales';
import { StatusTags } from '../tags';
import {
  CardContainer,
  ProjectCardLink,
  ProjectDateContainer,
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
  start_date?: string;
  end_date?: string;
}

export function ProjectsCard({ ...props }: IProjectsCardProps) {
  const { id, project_name, investors, project_status, start_date, end_date } =
    props;
  const { t } = useTranslation();

  return (
    <ProjectCardLink href={`/project/${id}`}>
      <CardActionArea>
        <CardContainer>
          <HexDecor />
          <CardContent>
            <ProjectTitleContainer>
              <ProjectTitle variant="h4" component="h4">
                {project_name}
              </ProjectTitle>
              <StatusTags status={project_status} />
            </ProjectTitleContainer>
            <ProjectInfoContainer>
              {investors.length > 0 && (
                <ProjectInvestors>
                  <GroupsOutlinedIcon />
                  {/*// TODO check with actual investors for styling issues */}
                  {investors.map((investor) => (
                    <span key={investor}>{investor}</span>
                  ))}
                </ProjectInvestors>
              )}
              <ProjectDateContainer>
                {/* // TODO check with actual dates for styling issues */}
                {(start_date || end_date) && <CalendarMonthOutlinedIcon />}
                {start_date && <span>{formatDate(start_date)}</span>}
                {end_date && <span>{formatDate(end_date)}</span>}
              </ProjectDateContainer>
            </ProjectInfoContainer>
            <Box display="flex" alignItems="center" gap={1}>
              {t(TRANSLATIONS.DETAILS)} <KeyboardArrowRightOutlinedIcon />
            </Box>
          </CardContent>
        </CardContainer>
      </CardActionArea>
    </ProjectCardLink>
  );
}

export default ProjectsCard;
