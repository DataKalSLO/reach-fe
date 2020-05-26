import { Divider, styled } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Graph } from '../../redux/graphbuilder/types';
import { getVizbuilder } from '../../redux/vizbuilder/selector';
import { GRAPH_COLORS } from '../builder/constants';
import { SeriesConfiguration } from '../builder/types';
import {
  DATASET_LABEL,
  INPUT_COLUMN_LABEL,
  INPUT_NAME_LABEL,
  X_AXIS_LABEL,
  Y_AXIS_LABEL
} from './constants';
import { FormDataSelection } from './FormDataSelection';
import { FormFooter } from './FormFooter';
import { FormSeriesSelection } from './FormSeriesSelection';
import { FormProps, GraphDataFormState } from './types';
import {
  convertDataSourcesToFormDataState,
  convertFormDataStateToDataSources,
  extractInfoFromDatasetsMetaData
} from './utilities';

export default function DataForm(props: FormProps) {
  const { graph, index, handleCancel, handleUpdate } = props;
  const vizState = useSelector(getVizbuilder);
  const datasetsInfo = extractInfoFromDatasetsMetaData(
    vizState.metadataForAllDatasets
  );
  const [seriesState, setSeriesState] = useState<SeriesConfiguration[]>([
    ...graph.graphMetaData.graphOptions.seriesConfigs
  ]);

  const [dataState, setDataState] = useState<GraphDataFormState>(
    convertDataSourcesToFormDataState(graph.graphMetaData.dataSources)
  );

  const handleDatasetChange = (selectedDataset: string) => {
    setDataState({ ...dataState, datasetName: selectedDataset });
  };

  const handleXAxisColumnChange = (selectedXAxisColumn: string) => {
    setDataState({ ...dataState, xAxisColumnName: selectedXAxisColumn });
  };

  const handleYAxisColumnChange = (
    columnIndex: number,
    newColumnName: string
  ) => {
    const newColumnNames = dataState.yAxisColumnNames.map(
      (columnName: string, index: number) => {
        if (columnIndex === index) {
          return newColumnName;
        }
        return columnName;
      }
    );
    const newSeries = seriesState.map((series, index) => {
      if (columnIndex === index) {
        return { ...series, name: newColumnName };
      }
      return series;
    });
    setDataState({ ...dataState, yAxisColumnNames: newColumnNames });
    setSeriesState(newSeries);
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
    const defaultSeries: SeriesConfiguration = {
      seriesType: 'column',
      name: defaultColumnName,
      color: GRAPH_COLORS[seriesState.length],
      dataLabels: false
    };
    setDataState({
      ...dataState,
      yAxisColumnNames: [...dataState.yAxisColumnNames, defaultColumnName]
    });
    setSeriesState([...seriesState, defaultSeries]);
  };

  const handleReset = () => {
    setDataState(
      convertDataSourcesToFormDataState(graph.graphMetaData.dataSources)
    );
  };

  const updateForm = () => {
    const newGraph: Graph = {
      ...graph,
      graphMetaData: {
        ...graph.graphMetaData,
        dataSources: convertFormDataStateToDataSources(dataState),
        graphOptions: {
          ...graph.graphMetaData.graphOptions,
          seriesConfigs: seriesState
        }
      }
    };
    handleUpdate(newGraph);
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
      <FormFooter
        handleCancel={() => handleCancel(index)}
        handleReset={() => handleReset()}
        handleUpdate={() => updateForm()}
      />
    </Fragment>
  );
}

const FormDivider = styled(Divider)({
  margin: '10px 0px 10px 0px'
});
