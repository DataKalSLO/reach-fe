import { styled } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import FormBlock from '../../common/components/FormBlock';
import { TextFieldSelect } from '../../common/components/FormSelectionField';

interface Props {
  label: string;
  inputLabel: string;
  value: string;
  data: string[];
  handleChange: (selectedColumn: string) => void;
}

export function FormDataSelection(props: Props) {
  return (
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
  );
}

const FormTextField = styled(TextFieldSelect)({
  marginRight: '10px'
});
