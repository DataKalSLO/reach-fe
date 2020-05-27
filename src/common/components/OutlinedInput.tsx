import { OutlinedInput as CoreOutlinedInput, styled } from '@material-ui/core';
import React from 'react';

// Takes optional width prop and injects into styling
const StyledCoreOutlinedInput = styled(({ width, ...other }: Props) => (
  <CoreOutlinedInput {...other} />
))({
  // If given width prop, use that, otherwise default
  width: (props: Props) => (props.width ? props.width : 'auto')
});

interface Props {
  'aria-label': string;
  placeholder: string;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Optional properties that gave me a TS error when I removed them from this interface

  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  button?: JSX.Element; // Button that will show up at end of text field
  width?: number | string; // CSS width, e.g. "100px" or 100
}

export default function OutlinedInput(props: Props) {
  return (
    <StyledCoreOutlinedInput
      placeholder={props.placeholder}
      aria-label={props['aria-label']}
      endAdornment={props.button}
      margin="dense"
      color="primary"
      {...props}
    />
  );
}
