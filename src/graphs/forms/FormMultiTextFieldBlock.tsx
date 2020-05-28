import { styled } from '@material-ui/core';
import React, { Fragment } from 'react';
import { isDefinedElse } from './utilities';
import { TextField } from '../../common/components/FormTextField';

interface Props {
  labels: string[];
  values: (string | undefined)[];
  handlers: ((value: string) => void)[];
}

export function FormMultiTextFieldBlock(props: Props) {
  return (
    <Fragment>
      {props.labels.map((label, index) => {
        return (
          <FormTextField
            key={index}
            label={label}
            value={isDefinedElse(props.values[index], '')}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              props.handlers[index](value.target.value)
            }
          />
        );
      })}
    </Fragment>
  );
}

const FormTextField = styled(TextField)({
  marginRight: '10px'
});
