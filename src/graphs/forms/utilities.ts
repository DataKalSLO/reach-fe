import {
  DataSource,
  DataSourceTypesEnum
} from '../../redux/graphbuilder/types';
import { Metadata } from '../../redux/vizbuilder/types';
import { DatasetsMetaData, GraphDataFormState } from './types';
import { isUndefined } from 'util';

/*
 * Extract the x-axis and y-axis column names used
 * for a graph.
 * TODO: Add stacking
 */
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

/*
 * TODO: Add stacking
 */
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

/*
 * This method extracts the following information from the datasets
 * metadata:
 *  1. All the dataset names
 *  2. A dictionary mapping dataset names to x-axis columns
 *      - all columns are added (x-axis values can be any type)
 *  3. A dictionary mapping dataset names to y-axis columns
 *      - only columns with numbers are added (y-axis values can only be numbers)
 */
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

export function isDefinedElseEmptyString(value?: string): string {
  return isDefinedElse(value, '');
}

export function changeEntryAtIndex<T, S>(
  items: Array<T>,
  key: string,
  value: S,
  atIndex: number
): Array<T> {
  return items.map((item, index) => {
    if (index === atIndex) {
      return { ...item, [key]: value };
    }
    return item;
  });
}

export function isDefinedElse<T>(value: T | undefined, elseValue: T): T {
  return !isUndefined(value) ? value : elseValue;
}
