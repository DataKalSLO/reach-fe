import { DataSource, GraphMetaDataApiPayload } from '../../redux/graphs/types';

export enum GraphActions {
  CREATE,
  UPDATE,
  GET_BY_ID,
  DELETE_BY_ID,
  GET_ALL_GRAPHS_BY_ID,
  GET_DEFAULT_GRAPHS_BY_CATEGORY
}

export interface DatabaseGraphMetaData {
  graphId: string;
  userId: string;
  timestamp: number;
  graphTitle: string;
  snapshotUrl: string;
  dataSources: DataSource[];
  graphOptions: string;
}

export interface ApiGraphConfirmationResponse {
  graphId: string;
}

export type GraphApiPayload = GraphMetaDataApiPayload | string | undefined;
export type GraphApiResponse =
  | DatabaseGraphMetaData
  | DatabaseGraphMetaData[]
  | ApiGraphConfirmationResponse;
