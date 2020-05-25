import { styled } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import FormBlock from '../../common/components/FormBlock';
import { TextFieldSelect } from '../../common/components/FormSelectionField';
import { INPUT_NAME_LABEL } from './constants';

interface Props {
  label: string;
  datasetName: string;
  datasetNames: string[];
  handleChange: (selectedDataset: string) => void;
}

export function FormDatasetSelection(props: Props) {
  return (
    <FormBlock label={props.label}>
      <FormTextField
        label={INPUT_NAME_LABEL}
        value={props.datasetName}
        data={props.datasetNames}
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
