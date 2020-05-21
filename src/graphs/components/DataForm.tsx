import React, { useState, Fragment, ChangeEvent } from 'react';
import { TextFieldSelect } from './FormSelectionField';
import { styled, Box, Divider, Typography } from '@material-ui/core';
import { Button } from '../../common/components/Button';
import FormBlock from './FormBlock';
import IconButton from '../../common/components/IconButton';
import { Delete, BorderAllTwoTone } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import BoxCenter from '../../common/components/BoxCenter';

const datasets = [
  'slo_airports',
  'dod_contracts',
  'covid-19-slo',
  'covid-19-sb',
  'median-income'
];

const columns = ['United', 'American', 'Alaska', 'Month', 'Type'];

interface SeriesProps {
  seriesId: string;
  seriesName: string;
  seriesColumn: string;
}

const DATASET_LABEL = 'Dataset';
const X_AXIS_LABEL = 'X-Axis';
const Y_AXIS_LABEL = 'Choose the Y-Axis Data Columns:';
const SERIES_LABEL = 'Series';
const STACK_LABEL = 'Choose the Stacking Data Column';

export default function DataForm() {
  const [dataState, setDataState] = useState({
    dataset: datasets[0],
    xColumn: columns[0],
    stackColumn: 'None',
    yColumns: [
      {
        seriesId: '0',
        seriesName: 'Series 1',
        seriesColumn: columns[0]
      },
      {
        seriesId: '1',
        seriesName: 'Covid-19 Data 2018',
        seriesColumn: columns[1]
      }
    ]
  });

  const handleDatasetChange = (id: string, selectedDataset: string) => {
    setDataState({ ...dataState, dataset: selectedDataset });
  };

  const handleXAxisColumnChange = (id: string, selectedXAxisColumn: string) => {
    setDataState({ ...dataState, xColumn: selectedXAxisColumn });
  };

  const handleYAxisColumnChange = (id: string, columnName: string) => {
    const newYColumns = dataState.yColumns.map((series: SeriesProps) => {
      if (series.seriesId === id) {
        return { ...series, seriesColumn: columnName };
      }
      return series;
    });
    setDataState({ ...dataState, yColumns: newYColumns });
  };

  const handleStackColumnChange = (id: string, columnName: string) => {
    setDataState({ ...dataState, stackColumn: columnName });
  };

  const handleDeleteYAxisColumn = (id: string) => {
    const newYColumns = dataState.yColumns.filter(
      series => series.seriesId !== id
    );
    setDataState({ ...dataState, yColumns: newYColumns });
  };

  const handleAddYAxisColumn = () => {
    const newYColumn = {
      seriesId: dataState.yColumns.length.toString(),
      seriesName: `Series ${dataState.yColumns.length + 1}`,
      seriesColumn: columns[0]
    };
    setDataState({
      ...dataState,
      yColumns: [...dataState.yColumns, newYColumn]
    });
  };

  return (
    <Fragment>
      <FormBlock label={DATASET_LABEL}>
        <FormTextField
          label="Name"
          value={dataState.dataset}
          data={datasets}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleDatasetChange('dataset', e.target.value)
          }
        />
      </FormBlock>
      <FormDivider light />
      <FormBlock label={X_AXIS_LABEL}>
        <FormTextField
          label="Column"
          value={dataState.xColumn}
          data={columns}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleXAxisColumnChange('Column', e.target.value)
          }
        />
      </FormBlock>
      <FormDivider light />
      <FormBlock label={SERIES_LABEL}>
        {dataState.yColumns.map((series, index) => {
          return (
            <FormBlock key={series.seriesId}>
              <FormTextField
                label={`Series ${index + 1}`}
                value={series.seriesColumn}
                data={columns}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleYAxisColumnChange(series.seriesId, e.target.value)
                }
              />
              <IconButton
                size="small"
                color="default"
                aria-label="Delete"
                icon={<Delete color="error" />}
                onClick={() => handleDeleteYAxisColumn(series.seriesId)}
              />
            </FormBlock>
          );
        })}
      </FormBlock>
      <FormBox>
        <Button
          label="Add Series"
          variant="text"
          color="default"
          aria-label="Add"
          startIcon={<AddIcon color="primary" />}
          onClick={() => handleAddYAxisColumn()}
        />
      </FormBox>
      <FormFooter>
        <Button
          size="large"
          label="Cancel"
          color="default"
          variant="text"
          onClick={() => {
            alert('Not Yet');
          }}
        />
        <Button
          size="large"
          label="Update"
          color="primary"
          variant="text"
          onClick={() => {
            alert('Not Yet');
          }}
        />
      </FormFooter>
    </Fragment>
  );
}

const FormFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end'
});

const FormDivider = styled(Divider)({
  margin: '10px 0px 10px 0px'
});

const FormBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  minWidth: '300px'
});

const FormTextField = styled(TextFieldSelect)({
  marginRight: '10px'
});
