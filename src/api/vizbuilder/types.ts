import { Metadata, DataValue, DataColumns } from '../../redux/vizbuilder/types';

export enum VizbuilderActions {
  GET_METADATA,
  GET_COLUMNS
}

export interface DataColumnsRecord {
  [columName: string]: DataValue[];
}

export type VizbuilderApiPayload = string | undefined;
export type VizbuilderApiResponse = Metadata[] | DataColumns;
