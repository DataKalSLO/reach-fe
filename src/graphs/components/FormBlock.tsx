import React from 'react';
import { FormLabel, styled, Box, Grid } from '@material-ui/core';
import { isUndefined } from 'util';
import { theme } from '../../theme/theme';

interface Props {
  children: JSX.Element[] | JSX.Element;
  label?: string;
  // This extra parameter is necessary to allow other props to be passed through
  innerBlockProps?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function FormBlock(props: Props) {
  const { children, label, innerBlockProps, ...otherProps } = props;
  return (
    <OuterGridContainer container {...otherProps}>
      {isUndefined(label) ? null : <StyledFormLabel>{label}</StyledFormLabel>}
      <InnerGridContainer container {...innerBlockProps}>
        {children}
      </InnerGridContainer>
    </OuterGridContainer>
  );
}

const OuterGridContainer = styled(Grid)({
  flexDirection: 'column'
});

const InnerGridContainer = styled(Grid)({
  flexDirection: 'row',
  alignItems: 'center'
});

const StyledFormLabel = styled(FormLabel)({
  margin: '10px'
});
