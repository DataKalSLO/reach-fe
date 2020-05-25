import moment from 'moment';
import { isString } from 'util';
import {
  DataSource,
  DataSourceTypesEnum,
  GraphData
} from '../../redux/graphbuilder/types';
import {
  DataColumns,
  DataColumnsApiPayload,
  DataValue
} from '../../redux/vizbuilder/types';
import { DataColumnsRecord } from './types';

export function convertDataColumnsPayloadToQuery(
  payload: DataColumnsApiPayload
): string {
  const initialQueryValues = [
    `?tableName=${payload.datasetName}`,
    ...payload.columnNames
  ];
  return initialQueryValues.join('&columns=');
}

// Assumes that all dataset names will be the
// same since only one dataset is allowed per
// graph
export function convertDataSourcesToDataColumnsPayload(
  payload: DataSource[]
): DataColumnsApiPayload {
  let datasetName = '';
  const columnNames: string[] = [];
  payload.forEach(dataSource => {
    datasetName = dataSource.datasetName;
    columnNames.push(...Array.from(new Set(dataSource.columnNames)));
  });
  return {
    datasetName: datasetName,
    columnNames: columnNames
  };
}

export function convertDataColumnsToGraphDataSource(
  dataColumnsResponse: DataColumns,
  dataColumnsPayload: DataColumnsApiPayload,
  dataSources: DataSource[]
): GraphData {
  let xAxisData: DataValue[] = [];
  let stackData: DataValue[] | undefined = undefined;
  const yAxisData: DataValue[][] = [];
  const columnsRecord = convertDataRowsToColumns(
    dataColumnsResponse.data,
    dataColumnsPayload.columnNames
  );
  dataSources.forEach(dataSource => {
    dataSource.columnNames.forEach(columnName => {
      switch (dataSource.seriesType) {
        case DataSourceTypesEnum.X_AXIS:
          xAxisData = columnsRecord[columnName];
          break;
        case DataSourceTypesEnum.Y_AXIS:
          yAxisData.push(columnsRecord[columnName]);
          break;
        case DataSourceTypesEnum.STACK:
          stackData = columnsRecord[columnName];
          break;
        default:
          throw new Error(
            'Non-supported Data Source Type on Vizbuider: ' +
              dataSource.seriesType
          );
      }
    });
  });
  return {
    xAxisData: xAxisData,
    yAxisData: yAxisData,
    stackData: stackData
  };
}

//TODO: check if columNames and data are different lengths
function convertDataRowsToColumns(
  data: DataValue[][],
  columnNames: string[]
): DataColumnsRecord {
  const columns: DataColumnsRecord = {};
  data.forEach(dataRow => {
    dataRow.forEach((columnValue, columnIndex) => {
      const columnName = columnNames[columnIndex];
      if (!(columnName in columns)) {
        columns[columnName] = [];
      }
      columns[columnName].push(
        isDateType(columnValue) ? new Date(columnValue) : columnValue
      );
    });
  });
  return columns;
}

function isDateType(value: DataValue): boolean {
  return (
    isString(value) &&
    moment(value, moment.ISO_8601, true).format() !== 'Invalid date'
  );
}
