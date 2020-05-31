import { DataSource, GraphData } from '../../redux/graphs/types';
import {
  DataColumns,
  DataColumnsApiPayload,
  Metadata
} from '../../redux/vizbuilder/types';
import { get } from '../base';
import {
  convertDataColumnsPayloadToQuery,
  convertDataColumnsToGraphDataSource,
  convertDataSourcesToDataColumnsPayload
} from './converter';
import {
  Selection,
  VizbuilderActions,
  VizbuilderApiPayload,
  VizbuilderApiResponse
} from './types';

export async function getDatasetsMetaData(): Promise<Metadata[]> {
  return httpRequestWithDatasetsMetaDataResponse(
    VizbuilderActions.GET_METADATA,
    undefined
  );
}

export async function getDataColumns(
  dataColumnsPayload: DataColumnsApiPayload
): Promise<DataColumns> {
  const dataColumnsQueryString = convertDataColumnsPayloadToQuery(
    dataColumnsPayload
  );
  return httpRequestWithColumnsDataResponse(
    VizbuilderActions.GET_COLUMNS,
    dataColumnsQueryString
  );
}

export async function getTableNames(): Promise<Selection[]> {
  return httpRequestWithTableNamesResponse(
    VizbuilderActions.GET_TABLE_NAMES,
    undefined
  );
}

export async function getMapSelection(): Promise<Selection[]> {
  return httpRequestWithTableNamesResponse(
    VizbuilderActions.GET_TABLE_NAMES,
    undefined
  );
}

export async function getDataColumnsForDataSources(
  dataSources: DataSource[]
): Promise<GraphData> {
  const dataColumns = convertDataSourcesToDataColumnsPayload(dataSources);
  const dataColumnsQueryString = convertDataColumnsPayloadToQuery(dataColumns);
  return convertDataColumnsToGraphDataSource(
    await httpRequestWithColumnsDataResponse(
      VizbuilderActions.GET_COLUMNS,
      dataColumnsQueryString
    ),
    dataColumns,
    dataSources
  );
}

export async function httpRequestWithDatasetsMetaDataResponse(
  actionType: VizbuilderActions,
  payload: VizbuilderApiPayload
): Promise<Metadata[]> {
  const response: VizbuilderApiResponse = await vizbuilderHttp(
    actionType,
    payload
  );
  if (response as Metadata[]) {
    return response as Metadata[];
  } else {
    throw new Error(
      'Expected a MetaData object to be returned by call vizbuilder action: ' +
        actionType
    );
  }
}

export async function httpRequestWithColumnsDataResponse(
  actionType: VizbuilderActions,
  payload: VizbuilderApiPayload
): Promise<DataColumns> {
  const response: VizbuilderApiResponse = await vizbuilderHttp(
    actionType,
    payload
  );
  if (response as DataColumns) {
    return response as DataColumns;
  } else {
    throw new Error(
      'Expected a Data Columns object to be returned by call vizbuilder action: ' +
        actionType
    );
  }
}

export async function httpRequestWithTableNamesResponse(
  actionType: VizbuilderActions,
  payload: VizbuilderApiPayload
): Promise<Selection[]> {
  const response: VizbuilderApiResponse = await vizbuilderHttp(
    actionType,
    payload
  );
  if (response as Selection[]) {
    return response as Selection[];
  } else {
    throw new Error('No dataset tables');
  }
}

async function vizbuilderHttp(
  actionType: VizbuilderActions,
  payload: VizbuilderApiPayload
): Promise<VizbuilderApiResponse> {
  let response: unknown;
  switch (actionType) {
    case VizbuilderActions.GET_METADATA:
      response = get('MetaData/');
      break;
    case VizbuilderActions.GET_COLUMNS:
      response = get('DataSets' + payload);
      break;
    case VizbuilderActions.GET_TABLE_NAMES:
      response = get('Map/tableNames/');
      break;
    default:
      throw new Error(
        'Unimplemented mutation action on Vizbuilder: ' + actionType
      );
  }
  return response as VizbuilderApiResponse;
}
