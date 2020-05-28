import { DataSource, GraphData } from '../../redux/graphs/types';
import {
  DataColumns,
  DataColumnsApiPayload,
  Metadata
} from '../../redux/vizbuilder/types';
import { handleApiOperation } from '../operations';
import {
  COLUMNS_RETRIEVAL_FAILURE_MESSAGE,
  COLUMNS_RETRIEVAL_SUCCESS_MESSAGE,
  METADATA_RETRIEVAL_FAILURE_MESSAGE,
  METADATA_RETRIEVAL_SUCCESS_MESSAGE
} from './constants';
import {
  getDataColumns,
  getDataColumnsForDataSources,
  getDatasetsMetaData
} from './operations';

export async function getDatasetMetaDataAndHandleResponse(): Promise<
  Metadata[] | undefined
> {
  return await handleApiOperation<void, Metadata[]>(
    undefined,
    getDatasetsMetaData,
    METADATA_RETRIEVAL_SUCCESS_MESSAGE,
    METADATA_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getDataColumnsAndHandleResponse(
  dataColumnsPayload: DataColumnsApiPayload
): Promise<DataColumns | undefined> {
  return await handleApiOperation<DataColumnsApiPayload, DataColumns>(
    dataColumnsPayload,
    getDataColumns,
    COLUMNS_RETRIEVAL_SUCCESS_MESSAGE,
    COLUMNS_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getDataColumnsForDataSourcesAndHandleResponse(
  dataSources: DataSource[]
): Promise<GraphData | undefined> {
  return await handleApiOperation<DataSource[], GraphData>(
    dataSources,
    getDataColumnsForDataSources,
    COLUMNS_RETRIEVAL_SUCCESS_MESSAGE,
    COLUMNS_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}
