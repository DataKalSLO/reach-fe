import { Grid } from '@material-ui/core';
import React from 'react';

interface GalleryProps {
  children: JSX.Element[];
}

const Gallery = (props: GalleryProps) => {
  return (
    // creates a 32px (4 * 8px = 32px) wide gap between items
    // https://material-ui.com/components/grid/#spacing
    <Grid container spacing={4}>
      {props.children}
    </Grid>
  );
};

export default Gallery;
