import {
  DataSource,
  PartialGraphConfigurationWithoutData
} from '../../redux/graphs/types';

export enum GraphActions {
  CREATE,
  UPDATE,
  GET_BY_ID,
  DELETE_BY_ID,
  GET_ALL_GRAPHS_BY_ID,
  GET_DEFAULT_GRAPHS_BY_CATEGORY
}

export interface DatabaseGraphMetaData {
  GraphId: string | null;
  GraphCategory: string | null;
  GraphTitle: string;
  DataSources: DataSource[];
  GraphOptions: PartialGraphConfigurationWithoutData;
  GraphSVG: string;
}

export interface ApiGraphMetaData {
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

export type GraphApiPayload = DatabaseGraphMetaData | string | undefined;
export type GraphApiResponse =
  | ApiGraphMetaData
  | ApiGraphMetaData[]
  | ApiGraphConfirmationResponse;
