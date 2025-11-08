import { Box, CardActionArea, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { CardContainer, CardWrapper } from './card.styled';

interface CardComponentProps {
  color: string;
  header: string;
  description?: string | number;
  count?: number;
  href: string;
}

export function CardComponent({ ...props }: CardComponentProps) {
  const { color, header, href, description, count } = props;

  return (
    <Link href={href}>
      <CardWrapper cardColor={color}>
        <CardActionArea>
          <CardContainer cardColor={color}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="h4">
                {header}
              </Typography>
              {description ? (
                <Box>
                  <Typography variant="h5" component="h5">
                    {description}
                  </Typography>
                  <Typography variant="h4" component="h4">
                    {count}
                  </Typography>
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
