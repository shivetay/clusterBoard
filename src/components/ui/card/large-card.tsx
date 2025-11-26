import SubdirectoryArrowRightOutlinedIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import { CardActionArea, CardContent } from '@mui/material';
import {
  CardContainer,
  CardHeader,
  CardHelperText,
  CardWrapper,
  CountHeaderContainer,
  GridCardContainer,
  IconContainer,
  MainIconContainer,
  SpannedCardDescriptionHeader,
  SpannedCountHeader,
  SpannedMaxCountHeaderCount,
} from './card.styled';

interface CardComponentProps {
  header: string;
  description?: string | number;
  count?: number;
  maxCount?: number;
  href: string;
  icon?: React.ReactNode;
  iconColor?: string;
  extended?: boolean;
  span?: number;
}

export function LargeCard({ ...props }: CardComponentProps) {
  const {
    header,
    href,
    description,
    count,
    maxCount,
    icon,
    iconColor,
    extended,
    span,
  } = props;

  return (
    <GridCardContainer href={href} extended={extended} span={span}>
      <CardWrapper>
        <CardActionArea sx={{ height: '100%' }}>
          <CardContainer>
            <CardContent>
              <CardHeader iconColor={iconColor}>
                <MainIconContainer>
                  {icon}
                  <SpannedCardDescriptionHeader variant="h3" as="h3">
                    {header}
                  </SpannedCardDescriptionHeader>
                </MainIconContainer>
                <IconContainer>
                  <SubdirectoryArrowRightOutlinedIcon />
                </IconContainer>
              </CardHeader>
              {description ? (
                <CountHeaderContainer>
                  <SpannedCountHeader>{count}</SpannedCountHeader>
                  <SpannedMaxCountHeaderCount variant="h3" as="h3">
                    / {`${maxCount}`}
                  </SpannedMaxCountHeaderCount>
                  <CardHelperText>{description}</CardHelperText>
                </CountHeaderContainer>
              ) : null}
            </CardContent>
          </CardContainer>
        </CardActionArea>
      </CardWrapper>
    </GridCardContainer>
  );
}

export default LargeCard;
