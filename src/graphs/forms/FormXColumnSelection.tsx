import React, { ChangeEvent } from 'react';
import FormBlock from '../../common/components/FormBlock';
import { INPUT_COLUMN_LABEL } from './constants';
import { styled } from '@material-ui/core';
import { TextFieldSelect } from '../../common/components/FormSelectionField';

interface Props {
  label: string;
  columnName: string;
  columnNames: string[];
  handleChange: (selectedColumn: string) => void;
}

export function FormXSelection(props: Props) {
  return (
    <FormBlock label={props.label}>
      <FormTextField
        label={INPUT_COLUMN_LABEL}
        value={props.columnName}
        data={props.columnNames}
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
