import { DataColumns, DataValue, Metadata } from '../../redux/vizbuilder/types';

export enum VizbuilderActions {
  GET_METADATA,
  GET_COLUMNS,
  GET_TABLE_NAMES
}

export interface DataColumnsRecord {
  [columName: string]: DataValue[];
}

export type VizbuilderApiPayload = string | undefined;
export type VizbuilderApiResponse = Metadata[] | DataColumns | string[];
