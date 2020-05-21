import React, { ChangeEvent } from 'react';
import {
  TextField as CoreTextField,
  MenuItem,
  styled
} from '@material-ui/core';

export interface Props {
  value: string;
  data: string[];
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function TextFieldSelect(props: Props) {
  const { value, data, ...otherProps } = props;
  return (
    <FormTextFieldSelect
      select
      variant="outlined"
      margin="dense"
      value={value}
      {...otherProps}
    >
      {data.map((dataValue, index) => {
        return (
          <MenuItem key={index} value={dataValue}>
            {dataValue}
          </MenuItem>
        );
      })}
    </FormTextFieldSelect>
  );
}

const FormTextFieldSelect = styled(CoreTextField)({
  margin: '10px',
  display: 'flex',
  flex: '1 1 130px',
  minWidth: '130px'
});
