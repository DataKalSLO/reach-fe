import { DataColumns, DataValue, Metadata } from '../../redux/vizbuilder/types';

export enum VizbuilderActions {
  GET_METADATA,
  GET_COLUMNS,
  GET_TABLE_NAMES
}

export interface DataColumnsRecord {
  [columName: string]: DataValue[];
}

export interface Selection {
  tableName: string;
  geoType: string;
  censusDesc: string; // the census variable's description
}

export type VizbuilderApiPayload = string | undefined;
export type VizbuilderApiResponse = Metadata[] | DataColumns | Selection[];
