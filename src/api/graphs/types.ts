import {
  BaseGraphMetaData,
  GraphMetaDataApiPayload
} from '../../redux/graphs/types';

export enum GraphActions {
  CREATE,
  UPDATE,
  GET_BY_ID,
  DELETE_BY_ID,
  GET_ALL_GRAPHS_BY_USER,
  GET_DEFAULT_GRAPHS_BY_CATEGORY
}

export interface DatabaseGraphMetaData extends BaseGraphMetaData {
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
