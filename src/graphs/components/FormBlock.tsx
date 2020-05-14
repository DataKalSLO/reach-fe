import React from 'react';
import { FormLabel, styled, Box, Grid } from '@material-ui/core';
import { isUndefined } from 'util';

interface Props {
  children: JSX.Element[] | JSX.Element;
  label?: string;
  inline?: boolean;
  [x: string]: any;
}

export default function FormBlock(props: Props) {
  const { children, label, ...otherProps } = props;
  return (
    <FormGridContainer container direction="column" {...otherProps}>
      {isUndefined(label) ? null : <StyledFormLabel>{label}</StyledFormLabel>}
      <Grid item style={{ width: '100%' }}>
        {children}
      </Grid>
    </FormGridContainer>
  );
}

const FormGridContainer = styled(Grid)({
  width: '100%'
});

const StyledFormLabel = styled(FormLabel)({
  margin: '0px 10px 10px 0px'
});
