import React, { useState, Fragment } from 'react';
import { Box, styled, Divider } from '@material-ui/core';
import FormBlock from './FormBlock';
import { FormSelectionField } from './FormSelectionField';

const datasets = [
  'slo_airports',
  'dod_contracts',
  'covid-19-slo',
  'covid-19-sb',
  'median-income'
];

const DATASET_LABEL = 'Choose a Dataset:';

function AddDataSet() {
  const [dataState, setDataState] = useState({
    dataset: datasets[0]
  });

  const handleDatasetChange = (id: string, selectedDataset: string) => {
    setDataState({ ...dataState, dataset: selectedDataset });
  };

  return (
    <Fragment>
      <FormBlock label={DATASET_LABEL}>
        <FormSelectionField
          fullWidth
          required
          id="Dataset"
          label="Dataset"
          value={dataState.dataset}
          data={datasets}
          handleChange={handleDatasetChange}
        />
      </FormBlock>
      <FormDivider light />
    </Fragment>
  );
}

export default AddDataSet;

const FormDivider = styled(Divider)({
  margin: '10px 0px 10px 0px'
});
