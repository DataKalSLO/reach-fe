import { styled, TextField as CoreTextField } from '@material-ui/core';
import React from 'react';

interface Props {
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function TextField(props: Props) {
  return (
    <FormTextField size="small" variant="outlined" margin="dense" {...props} />
  );
}

const FormTextField = styled(CoreTextField)({
  margin: '10px',
  display: 'flex',
  flex: '1 1 130px',
  minWidth: '130px'
});
