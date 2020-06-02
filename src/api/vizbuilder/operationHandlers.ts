import { DataSource, GraphData } from '../../redux/graphs/types';
import {
  DataColumns,
  DataColumnsApiPayload,
  Metadata
} from '../../redux/vizbuilder/types';
import { callActionAndAlertOnError } from '../operations';
import {
  COLUMNS_RETRIEVAL_FAILURE_MESSAGE,
  COLUMNS_RETRIEVAL_SUCCESS_MESSAGE,
  METADATA_RETRIEVAL_FAILURE_MESSAGE,
  METADATA_RETRIEVAL_SUCCESS_MESSAGE,
  TABLE_NAMES_RETRIEVAL_FAILURE_MESSAGE,
  TABLE_NAMES_RETRIEVAL_SUCCESS_MESSAGE
} from './constants';
import {
  getDataColumns,
  getDataColumnsForDataSources,
  getDatasetsMetaData,
  getTableNames
} from './operations';
import { Selection } from './types';

export async function getDatasetMetaDataAndHandleResponse(): Promise<
  Metadata[] | undefined
> {
  return await callActionAndAlertOnError<Metadata[]>(
    () => getDatasetsMetaData(),
    METADATA_RETRIEVAL_SUCCESS_MESSAGE,
    METADATA_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getTableNamesAndHandleResponse(): Promise<
  Selection[] | undefined
> {
  return await handleApiOperation<void, Selection[]>(
    undefined,
    getTableNames,
    TABLE_NAMES_RETRIEVAL_SUCCESS_MESSAGE,
    TABLE_NAMES_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getDataColumnsAndHandleResponse(
  dataColumnsPayload: DataColumnsApiPayload
): Promise<DataColumns | undefined> {
  return await callActionAndAlertOnError<DataColumns>(
    () => getDataColumns(dataColumnsPayload),
    COLUMNS_RETRIEVAL_SUCCESS_MESSAGE,
    COLUMNS_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getDataColumnsForDataSourcesAndHandleResponse(
  dataSources: DataSource[]
): Promise<GraphData | undefined> {
  return await callActionAndAlertOnError<GraphData>(
    () => getDataColumnsForDataSources(dataSources),
    COLUMNS_RETRIEVAL_SUCCESS_MESSAGE,
    COLUMNS_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}
