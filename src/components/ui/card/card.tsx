import SubdirectoryArrowRightOutlinedIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import { CardContent } from '@mui/material';
import { useNavigation } from '@/providers';
import {
  CardContainer,
  CardHeader,
  CardHelperText,
  CardWrapper,
  CountHeader,
  CountHeaderContainer,
  CountHeaderCount,
  DescriptionHeader,
  GridCardContainer,
  IconContainer,
  MainIconContainer,
} from './card.styled';

interface CardComponentProps {
  header: string;
  description?: string | number;
  count?: number;
  maxCount?: number;
  href: string;
  icon?: React.ReactNode;
  iconColor?: string;
}

export function CardComponent({ ...props }: CardComponentProps) {
  const { header, href, description, count, maxCount, icon, iconColor } = props;
  const { setActiveElement } = useNavigation();
  const getActiveElement = href.split('/').pop();

  return (
    <GridCardContainer href={href}>
      <CardWrapper onClick={() => setActiveElement(getActiveElement || '')}>
        <CardContainer>
          <CardContent
            sx={{
              padding: 0,
              marginBottom: 0,
            }}
          >
            <CardHeader iconColor={iconColor}>
              <MainIconContainer>{icon}</MainIconContainer>
              <IconContainer>
                <SubdirectoryArrowRightOutlinedIcon />
              </IconContainer>
            </CardHeader>
            {description ? (
              <>
                <DescriptionHeader variant="h3" as="h3">
                  {header}
                </DescriptionHeader>
                <CountHeaderContainer>
                  <CountHeader>{count}</CountHeader>
                  {maxCount && (
                    <CountHeaderCount>{`${maxCount}`}</CountHeaderCount>
                  )}
                </CountHeaderContainer>
              </>
            ) : null}
            <CardHelperText>{description}</CardHelperText>
          </CardContent>
        </CardContainer>
      </CardWrapper>
    </GridCardContainer>
  );
}

export default CardComponent;
