// import { Box } from '@mui/material';
import { CardComponent, PageContainer } from '@/components';
import { ClusterCardContainer } from './cluster-view.styled';

const CARD_COLORS = [
  '#01c3a8',
  '#c301a8',
  '#a8c301',
  '#01a8c3',
  '#c3a801',
  '#a801c3',
];

export function ClusterView() {
  return (
    <PageContainer>
      <ClusterCardContainer>
        {CARD_COLORS.map((color) => (
          <CardComponent key={color} color={color} />
        ))}
      </ClusterCardContainer>
    </PageContainer>
  );
}

export default ClusterView;
