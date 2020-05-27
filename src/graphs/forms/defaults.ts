import { GRAPH_COLORS, DEFAULT_TITLE } from '../builder/constants';
import { SeriesConfiguration } from '../builder/types';
import { Metadata } from '../../redux/vizbuilder/types';
import { dataTypeIsNumber } from '../../redux/vizbuilder/utilities';
import { DataSourceTypesEnum } from '../../redux/graphs/types';
import { InitialGraphCreationState } from './types';
import { DEFAULT_SERIES } from './constants';

/*
 * Create a new default series
 */
export function generateDefaultSeries(
  name: string,
  index: number
): SeriesConfiguration {
  return {
    seriesType: DEFAULT_SERIES,
    name: name,
    color: GRAPH_COLORS[index],
    dataLabels: false
  };
}

/*
 * This generates an initial graph before it gets created.
 * The data sources and the graph options must be initialized before
 * being created.
 *  - The dataset, x-axis column and y-axis column must be initialized
 *  - The corresponding series for the y-axis column must be initialized
 *  - The first table in the metadata is used for initialization
 */
export const generateEmptyGraph = (
  datasetsMetaData: Metadata[]
): InitialGraphCreationState => {
  const defaultMetadata = datasetsMetaData[0];
  const columnsWithNumbers = defaultMetadata.columnNames.filter(
    (columnName, index) => dataTypeIsNumber(defaultMetadata.dataTypes[index])
  );
  const defaultColumnName = columnsWithNumbers[0];
  return {
    graphOptions: {
      title: DEFAULT_TITLE,
      seriesConfigs: [generateDefaultSeries(defaultColumnName, 0)]
    },
    dataSources: [
      {
        datasetName: defaultMetadata.tableName,
        columnNames: [defaultColumnName],
        seriesType: DataSourceTypesEnum.X_AXIS
      },
      {
        datasetName: defaultMetadata.tableName,
        columnNames: [defaultColumnName],
        seriesType: DataSourceTypesEnum.Y_AXIS
      }
    ]
  };
};
