import {
  DataSource,
  DataSourceTypesEnum
} from '../../redux/graphbuilder/types';
import { Metadata } from '../../redux/vizbuilder/types';
import { DatasetsMetaData, GraphDataFormState } from './types';

export function convertDataSourcesToFormDataState(
  dataSources: DataSource[]
): GraphDataFormState {
  const dataFormState: GraphDataFormState = {
    datasetName: '',
    xAxisColumnName: '',
    yAxisColumnNames: []
  };

  dataSources.forEach(dataSource => {
    dataFormState.datasetName = dataSource.datasetName;
    switch (dataSource.seriesType) {
      case DataSourceTypesEnum.X_AXIS:
        dataFormState.xAxisColumnName = dataSource.columnNames[0];
        break;
      case DataSourceTypesEnum.Y_AXIS:
        dataFormState.yAxisColumnNames.push(...dataSource.columnNames);
        break;
    }
  });
  return dataFormState;
}

export function convertFormDataStateToDataSources(
  formDataState: GraphDataFormState
): DataSource[] {
  return [
    {
      datasetName: formDataState.datasetName,
      columnNames: [formDataState.xAxisColumnName],
      seriesType: DataSourceTypesEnum.X_AXIS
    },
    {
      datasetName: formDataState.datasetName,
      columnNames: formDataState.yAxisColumnNames,
      seriesType: DataSourceTypesEnum.Y_AXIS
    }
  ];
}

export function extractInfoFromDatasetsMetaData(
  metaData: Metadata[]
): DatasetsMetaData {
  const datasetsMetaData: DatasetsMetaData = {
    datasetNames: [],
    xAxisColumnNames: {},
    yAxisColumnNames: {}
  };
  metaData.forEach(dataset => {
    const datasetName = dataset.tableName;
    datasetsMetaData.datasetNames.push(datasetName);
    datasetsMetaData.yAxisColumnNames[datasetName] = [];
    datasetsMetaData.xAxisColumnNames[datasetName] = [];
    dataset.columnNames.forEach((columnName, index) => {
      // only numbers are allowed in the y-axis
      if (dataTypeIsNumber(dataset.dataTypes[index])) {
        datasetsMetaData.yAxisColumnNames[datasetName].push(columnName);
      }
      datasetsMetaData.xAxisColumnNames[datasetName].push(columnName);
    });
  });
  return datasetsMetaData;
}

export function dataTypeIsNumber(valueType: string): boolean {
  return ['int', 'decimal', 'double', 'float'].includes(valueType);
}
