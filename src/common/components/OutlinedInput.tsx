import React from 'react';
import { OutlinedInput as CoreOutlinedInput, styled } from '@material-ui/core';

// Added optional props for height/width
const StyledCoreOutlinedInput = styled(({ width, ...other }: Props) => (
  <CoreOutlinedInput {...other} />
))({
  // If given width/height prop, use that, otherwise default
  width: (props: Props) => (props.width ? props.width : 'auto'),
  height: (props: Props) => (props.height ? props.height : 'auto')
});

interface Props {
  'aria-label': string; // Accessible label that describes button's purpose
  placeholder: string; // Placeholder text that appears while out of focus
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Optional properties that gave me a TS error when I removed them from this interface

  // Function that is called when input value changes
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  // Function that is called when key is pressed
  onKeyPress?: (e: React.KeyboardEvent) => void;
  button?: JSX.Element; // Button that will show up at end of text field
  width?: number | string; // CSS width, e.g. "100px" or 100
  height?: number | string; // CSS height, e.g. "100px" or 100
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
