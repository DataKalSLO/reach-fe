import { GRAPH_COLORS } from '../builder/constants';
import { SeriesConfiguration } from '../builder/types';
import { DatasetsMetaData } from './types';
import {
  GraphMetaData,
  DataSourceTypesEnum,
  PartialGraphConfigurationWithoutData,
  DataSource
} from '../../redux/graphbuilder/types';
import { Metadata } from '../../redux/vizbuilder/types';
import { dataTypeIsNumber } from './utilities';

export function generateDefaultSeries(
  name: string,
  index: number
): SeriesConfiguration {
  return {
    seriesType: 'column',
    name: name,
    color: GRAPH_COLORS[index],
    dataLabels: false
  };
}

export const generateEmptyGraph = (
  datasetsMetaData: Metadata[]
): DefaultGraph => {
  const defaultMetadata = datasetsMetaData[0];
  const columnsWithNumbers = defaultMetadata.columnNames.filter(
    (columnName, index) => dataTypeIsNumber(defaultMetadata.dataTypes[index])
  );
  return {
    graphOptions: {
      title: 'Chart',
      seriesConfigs: [generateDefaultSeries(columnsWithNumbers[0], 0)]
    },
    dataSources: [
      {
        datasetName: defaultMetadata.tableName,
        columnNames: [defaultMetadata.columnNames[0]],
        seriesType: DataSourceTypesEnum.X_AXIS
      },
      {
        datasetName: datasetsMetaData[0].tableName,
        columnNames: [columnsWithNumbers[0]],
        seriesType: DataSourceTypesEnum.Y_AXIS
      }
    ]
  };
};

export interface DefaultGraph {
  graphOptions: PartialGraphConfigurationWithoutData;
  dataSources: DataSource[];
}
