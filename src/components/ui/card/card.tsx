import { Box, CardActionArea, CardContent } from '@mui/material';
import Link from 'next/link';
import { TRANSLATIONS } from '@/locales';
import {
  CardContainer,
  CardHeader,
  CardWrapper,
  CountHeader,
  DescriptionHeader,
} from './card.styled';

interface CardComponentProps {
  header: string;
  description?: string | number;
  count?: number;
  maxCount?: number;
  href: string;
}

export function CardComponent({ ...props }: CardComponentProps) {
  const { header, href, description, count, maxCount = 5 } = props;

  return (
    <Link href={href}>
      <CardWrapper>
        <CardActionArea>
          <CardContainer>
            <CardContent>
              <CardHeader variant="h4" as="h4">
                {header}
              </CardHeader>
              {description ? (
                <Box>
                  <DescriptionHeader variant="h4" as="h4">
                    {description}
                  </DescriptionHeader>
                  <CountHeader variant="h4" as="h4">
                    {count}
                    {header === TRANSLATIONS.PROJEKTY ? `/${maxCount}` : ''}
                  </CountHeader>
                </Box>
              ) : null}
            </CardContent>
          </CardContainer>
        </CardActionArea>
      </CardWrapper>
    </Link>
  );
}

export default CardComponent;
