import React from 'react';
import { TextField, styled } from '@material-ui/core';

interface Props {
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function FormTextField(props: Props) {
  return <StyledTextField variant="outlined" margin="dense" {...props} />;
}

const StyledTextField = styled(TextField)({
  marginRight: '10px',
  minWidth: '100px'
});
