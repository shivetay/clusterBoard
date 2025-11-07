import { CardActionArea, CardContent } from '@mui/material';
import Link from 'next/link';
import { CardContainer, CardWrapper } from './card.styled';

interface CardComponentProps {
  color: string;
}

export function CardComponent({ color }: CardComponentProps) {
  return (
    <Link href={'/projects'}>
      <CardWrapper cardColor={color}>
        <CardActionArea>
          <CardContainer cardColor={color}>
            <CardContent>test</CardContent>
          </CardContainer>
        </CardActionArea>
      </CardWrapper>
    </Link>
  );
}

export default CardComponent;
