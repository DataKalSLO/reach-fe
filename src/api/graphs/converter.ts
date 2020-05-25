import { GraphMetaData } from '../../redux/graphbuilder/types';
import { DatabaseGraphMetaData } from './types';

export function transformDatabaseGraphMetaDataToGraphMetaData(
  databaseGraphMetaData: DatabaseGraphMetaData
): GraphMetaData {
  return {
    ...databaseGraphMetaData,
    graphOptions: JSON.parse(databaseGraphMetaData.graphOptions)
  };
}
