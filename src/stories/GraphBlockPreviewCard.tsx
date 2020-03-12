import { Card, CardActionArea, Paper, styled } from '@material-ui/core';
import React from 'react';

interface Props {
  index: number;
  graph: React.ReactNode;
  onClick: () => void;
}
export const GraphPreviewCard = (props: Props) => (
  <Card variant="outlined">
    <CardActionArea onClick={props.onClick}>
      <PreviewWrapper>{props.graph}</PreviewWrapper>
    </CardActionArea>
  </Card>
);

const PreviewWrapper = styled(Paper)({});
