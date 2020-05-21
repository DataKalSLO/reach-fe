import React, { ReactNode, ChangeEvent } from 'react';
import {
  FormControlLabel,
  Switch as CoreSwitch,
  styled
} from '@material-ui/core';

export interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function Switch(props: Props) {
  const { label, checked, onChange, ...otherProps } = props;

  return (
    <StyledFormControlLabel
      control={<CoreSwitch checked={checked} name={label} />}
      label={label}
      onChange={(event: ChangeEvent<{}>, checked: boolean) => onChange()}
      labelPlacement="end"
      {...otherProps}
    />
  );
}

const StyledFormControlLabel = styled(FormControlLabel)({
  margin: '10px'
});
