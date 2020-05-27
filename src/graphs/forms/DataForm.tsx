import { Divider, styled } from '@material-ui/core';
import React, { Fragment } from 'react';
import {
  DATASET_LABEL,
  INPUT_COLUMN_LABEL,
  INPUT_NAME_LABEL,
  X_AXIS_LABEL,
  Y_AXIS_LABEL
} from './constants';
import { generateDefaultSeries } from './defaults';
import { FormDataSelection } from './FormDataSelection';
import { FormSeriesSelection } from './FormSeriesSelection';
import { DataFormProps } from './types';
import {
  changeEntryAtIndex,
  extractInfoFromDatasetsMetaData
} from './utilities';

export function DataForm(props: DataFormProps) {
  const {
    metaData,
    dataState,
    seriesState,
    setDataState,
    setSeriesState,
    children
  } = props;

  const datasetsInfo = extractInfoFromDatasetsMetaData(metaData);

  const handleDatasetChange = (selectedDataset: string) => {
    setDataState({
      datasetName: selectedDataset,
      xAxisColumnName: datasetsInfo.xAxisColumnNames[selectedDataset][0],
      yAxisColumnNames: [datasetsInfo.yAxisColumnNames[selectedDataset][0]]
    });
    setSeriesState([
      generateDefaultSeries(
        datasetsInfo.yAxisColumnNames[selectedDataset][0],
        0
      )
    ]);
  };

  const handleXAxisColumnChange = (selectedXAxisColumn: string) => {
    setDataState({ ...dataState, xAxisColumnName: selectedXAxisColumn });
  };

  const handleYAxisColumnChange = (columnIndex: number, columnName: string) => {
    dataState.yAxisColumnNames.splice(columnIndex, 1, columnName);
    setSeriesState(
      changeEntryAtIndex(seriesState, 'name', columnName, columnIndex)
    );
    setDataState({
      ...dataState,
      yAxisColumnNames: [...dataState.yAxisColumnNames]
    });
  };

  const handleDeleteYAxisColumn = (columnIndex: number) => {
    const newYColumns = dataState.yAxisColumnNames.filter(
      (columnName: string, index: number) => columnIndex !== index
    );
    const newSeries = seriesState.filter(
      (series, index) => columnIndex === index
    );
    setDataState({ ...dataState, yAxisColumnNames: newYColumns });
    setSeriesState(newSeries);
  };

  const handleAddYAxisColumn = () => {
    const defaultColumnName =
      datasetsInfo.yAxisColumnNames[dataState.datasetName][0];
    setDataState({
      ...dataState,
      yAxisColumnNames: [...dataState.yAxisColumnNames, defaultColumnName]
    });
    setSeriesState([
      ...seriesState,
      generateDefaultSeries(defaultColumnName, seriesState.length)
    ]);
  };

  return (
    <Fragment>
      <FormDataSelection
        label={DATASET_LABEL}
        inputLabel={INPUT_NAME_LABEL}
        value={dataState.datasetName}
        data={datasetsInfo.datasetNames}
        handleChange={handleDatasetChange}
      />
      <FormDivider light />
      <FormDataSelection
        label={X_AXIS_LABEL}
        inputLabel={INPUT_COLUMN_LABEL}
        value={dataState.xAxisColumnName}
        data={datasetsInfo.xAxisColumnNames[dataState.datasetName]}
        handleChange={handleXAxisColumnChange}
      />
      <FormDivider light />
      <FormSeriesSelection
        label={Y_AXIS_LABEL}
        selectedColumnNames={dataState.yAxisColumnNames}
        columnNames={datasetsInfo.yAxisColumnNames[dataState.datasetName]}
        handleChange={handleYAxisColumnChange}
        handleDelete={handleDeleteYAxisColumn}
        handleAdd={handleAddYAxisColumn}
      />
      {children}
    </Fragment>
  );
}

const FormDivider = styled(Divider)({
  margin: '10px 0px 10px 0px'
});
