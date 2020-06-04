import React from 'react';
import { TextField as CoreTextField } from '@material-ui/core';

interface Props {
  label: string;

  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function TextField(props: Props) {
  return (
    <CoreTextField
      variant="outlined"
      label={props.label}
      style={{ marginTop: '10px', marginBottom: '10px' }}
      {...props}
    />
  );
}
