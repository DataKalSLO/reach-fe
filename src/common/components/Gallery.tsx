import { Box, Grid, styled, Typography } from '@material-ui/core';
import React from 'react';
import { isUndefined } from 'util';
import { theme } from '../../theme/theme';

export interface GalleryProps {
  children?: JSX.Element[];
  emptyStateHeading?: string;
  emptyStateMessage: string;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function Gallery(props: GalleryProps) {
  const { emptyStateHeading, emptyStateMessage, ...otherProps } = props;

  if (isUndefined(props.children) || props.children.length === 0) {
    return (
      <PaddedBox>
        <Typography variant="h4" component="h2">
          {props.emptyStateHeading}
        </Typography>
        <Typography variant="h6" component="body" color="textSecondary">
          {props.emptyStateMessage}
        </Typography>
      </PaddedBox>
    );
  } else {
    return (
      <PaddedGrid container {...otherProps}>
        {props.children}
      </PaddedGrid>
    );
  }
}

const marginTop = theme.spacing(2);
const marginBottom = theme.spacing(1);

const PaddedBox = styled(Box)({
  marginTop: marginTop,
  marginBottom: marginBottom
});

const PaddedGrid = styled(Grid)({
  marginTop: marginTop,
  marginBottom: marginBottom
});
