import React, { useState } from 'react';
import { TextField, MenuItem, styled } from '@material-ui/core';

export interface FormSelectionProps {
  id: string;
  value: string;
  data: string[];
  handleChange: (id: string, value: string) => void;
  [x: string]: any;
}

const FormSelectionField = (props: FormSelectionProps) => {
  const { id, value, data, handleChange, ...otherProps } = props;

  return (
    <FormTextField
      select
      variant="outlined"
      margin="dense"
      value={value}
      defaultValue={value}
      onChange={value => handleChange(id, value.target.value)}
      {...otherProps}
    >
      {data.map((value, index) => {
        return (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        );
      })}
    </FormTextField>
  );
};

export { FormSelectionField };

const FormTextField = styled(TextField)({
  minWidth: '100px',
  marginRight: '10px'
});
