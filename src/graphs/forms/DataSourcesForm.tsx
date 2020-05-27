import { Divider, styled } from '@material-ui/core';
import React, { Fragment } from 'react';
import { Metadata } from '../../redux/vizbuilder/types';
import { SeriesConfiguration } from '../builder/types';
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
import { GraphDataFormState } from './types';
import {
  changeEntryAtIndex,
  extractInfoFromDatasetsMetaData
} from './utilities';

export interface Props {
  metaData: Metadata[];
  dataState: GraphDataFormState;
  seriesState: SeriesConfiguration[];
  setDataState: React.Dispatch<React.SetStateAction<GraphDataFormState>>;
  setSeriesState: React.Dispatch<React.SetStateAction<SeriesConfiguration[]>>;
  children?: JSX.Element[] | JSX.Element;
}

/*
 * Both the dataState and the seriesState must be passed in since any changes
 * to the y-axis columns selection must also be reflected in the series.
 * e.g. if a user adds a new y-axis column, a new series must be generated
 */
export function DataSourcesForm(props: Props) {
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
    setDataState({ ...dataState, datasetName: selectedDataset });
  };

  const handleXAxisColumnChange = (selectedXAxisColumn: string) => {
    setDataState({ ...dataState, xAxisColumnName: selectedXAxisColumn });
  };

  const handleYAxisColumnChange = (columnIndex: number, columnName: string) => {
    setSeriesState(
      changeEntryAtIndex(seriesState, 'name', columnName, columnIndex)
    );
    setDataState({
      ...dataState,
      yAxisColumnNames: dataState.yAxisColumnNames.splice(
        columnIndex,
        1,
        columnName
      )
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
