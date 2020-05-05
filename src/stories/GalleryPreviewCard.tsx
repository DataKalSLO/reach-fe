import { Card, CardActionArea } from '@material-ui/core';
import React from 'react';

interface Props {
  index: number;
  content: React.ReactNode;
  onClick: () => void;
}
export const GalleryPreviewCard = (props: Props) => (
  <Card variant="outlined">
    <CardActionArea onClick={props.onClick}>
      <div>{props.content}</div>
    </CardActionArea>
  </Card>
);
