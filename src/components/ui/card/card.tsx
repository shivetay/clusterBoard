import SubdirectoryArrowRightOutlinedIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import { CardContent } from '@mui/material';
import { TRANSLATION_GROUPS } from '@/locales';
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
  disabled?: boolean;
}

export function CardComponent({ ...props }: CardComponentProps) {
  const {
    header,
    href,
    description,
    count,
    maxCount,
    icon,
    iconColor,
    disabled = true,
  } = props;
  const { setActiveElement } = useNavigation();
  const elementId = href.split('/').pop();

  return (
    <GridCardContainer href={disabled ? '#' : href}>
      <CardWrapper onClick={() => setActiveElement(elementId || null)}>
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
            <CardHelperText>{description} </CardHelperText>
            {disabled && (
              <CardHelperText sx={{ color: 'red' }}>
                {TRANSLATION_GROUPS.COMMON.CARD_NOT_ACTIVE}
              </CardHelperText>
            )}
          </CardContent>
        </CardContainer>
      </CardWrapper>
    </GridCardContainer>
  );
}

export default CardComponent;
