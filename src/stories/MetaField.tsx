import { styled, TextField } from '@material-ui/core';
import React from 'react';
import {
  UpdateDescriptionAction,
  UpdateTitleAction
} from '../redux/story/types';

const createCharCounter = (currentText: string, maxLength: number) => {
  return `${currentText.length}/${maxLength}`;
};

interface MetaFieldProps {
  content: string;
  id: string;
  label: string;
  maxLength: number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => UpdateTitleAction | UpdateDescriptionAction;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const MetaField = (props: MetaFieldProps) => {
  return (
    <StyledTextField
      variant="outlined"
      fullWidth
      required
      margin="dense"
      inputProps={{ maxLength: props.maxLength }}
      helperText={createCharCounter(props.content, props.maxLength)}
      defaultValue={props.content}
      {...props}
    />
  );
};

export { MetaField };

const StyledTextField = styled(TextField)({
  margin: '10px 10px 10px 0px'
});
