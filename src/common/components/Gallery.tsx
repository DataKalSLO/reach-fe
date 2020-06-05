import { Grid, styled } from '@material-ui/core';
import React from 'react';
import { theme } from '../../theme/theme';

export interface GalleryProps {
  children: JSX.Element[];

  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function Gallery(props: GalleryProps) {
  return (
    <PaddedGrid container {...props}>
      {props.children}
    </PaddedGrid>
  );
}

const PaddedGrid = styled(Grid)({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1)
});
