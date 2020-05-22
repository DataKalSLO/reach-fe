import {
  GraphMetaData,
  GraphMetaDataApiPayload
} from '../../redux/graphs/types';
import { ApiGraphMetaData, DatabaseGraphMetaData } from './types';

export function transformGraphMetaDataToDatabaseGraphMetaData(
  graphMetaDataPayload: GraphMetaDataApiPayload
): DatabaseGraphMetaData {
  return {
    GraphId: graphMetaDataPayload.graphId,
    GraphCategory: graphMetaDataPayload.graphCategory,
    GraphTitle: graphMetaDataPayload.metaData.graphTitle,
    DataSources: graphMetaDataPayload.metaData.dataSources,
    GraphOptions: graphMetaDataPayload.metaData.graphOptions,
    GraphSVG: graphMetaDataPayload.graphSVG
  };
}

export function transformApiGraphMetaDataToGraphMetaData(
  apiGraphMetaData: ApiGraphMetaData
): GraphMetaData {
  return {
    ...apiGraphMetaData,
    graphOptions: JSON.parse(apiGraphMetaData.graphOptions)
  };
}
