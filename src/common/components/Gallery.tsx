import { Grid } from '@material-ui/core';
import React from 'react';

export interface GalleryProps {
  children: JSX.Element[];
}

export default function Gallery(props: GalleryProps) {
  return (
    // creates a 32px (4 * 8px = 32px) wide gap between items
    // https://material-ui.com/components/grid/#spacing
    <Grid container spacing={4}>
      {props.children}
    </Grid>
  );
}
