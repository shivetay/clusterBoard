import SubdirectoryArrowRightOutlinedIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import { Box, CardActionArea } from '@mui/material';
import { backgroundGlowAnimation } from '@/theme';
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
      <CardWrapper sx={{ ...backgroundGlowAnimation }}>
        <CardActionArea sx={{ height: '100%' }}>
          <CardContainer>
            <CardHeader iconColor={iconColor}>
              <MainIconContainer>
                {icon}
                <SpannedCardDescriptionHeader
                  sx={{ fontSize: '1.88rem' }}
                  variant="h2"
                  as="h2"
                >
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
                <Box>
                  <SpannedMaxCountHeaderCount variant="h2" as="h2">
                    / {`${maxCount}`}
                  </SpannedMaxCountHeaderCount>
                  <CardHelperText>{description}</CardHelperText>
                </Box>
              </CountHeaderContainer>
            ) : null}
          </CardContainer>
        </CardActionArea>
      </CardWrapper>
    </GridCardContainer>
  );
}

export default LargeCard;
