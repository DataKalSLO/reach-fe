import { Grid, styled } from '@material-ui/core';
import React from 'react';
import { theme } from '../../theme/theme';

export interface GalleryProps {
  children: JSX.Element[];
}

export default function Gallery(props: GalleryProps) {
  return (
    // creates a 32px (4 * 8px = 32px) wide gap between items
    // https://material-ui.com/components/grid/#spacing
    <PaddedGrid container spacing={4}>
      {props.children}
    </PaddedGrid>
  );
}

const PaddedGrid = styled(Grid)({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1)
});
