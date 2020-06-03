import { styled } from '@material-ui/core';
import React, { ChangeEvent, Fragment, ReactNode } from 'react';
import FormBlock from '../../common/components/FormBlock';
import { TextFieldSelect } from '../../common/components/FormSelectionField';

interface Props {
  label: string;
  inputLabel: string;
  value: string;
  data: string[];
  handleChange: (selectedColumn: string) => void;
  children?: ReactNode;
}

export function FormDataSelection(props: Props) {
  return (
    <Fragment>
      <FormBlock label={props.label}>
        <FormTextField
          label={props.inputLabel}
          value={props.value}
          data={props.data}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            props.handleChange(e.target.value)
          }
        />
      </FormBlock>
      {props.children}
    </Fragment>
  );
}

const FormTextField = styled(TextFieldSelect)({
  marginRight: '10px'
});
