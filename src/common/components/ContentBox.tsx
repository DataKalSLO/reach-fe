import { Box, styled } from '@material-ui/core';
import React from 'react';
import { theme } from '../../theme/theme';

interface Props {
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/* A padding wrapper for creating consistent spacing on all pages but VizBuilder */
export default function ContentBox(props: Props) {
  return <PaddedBox {...props} />;
}

const PaddedBox = styled(Box)({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(12),
  paddingRight: theme.spacing(12)
});
