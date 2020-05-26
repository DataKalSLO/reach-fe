import {
  DataSource,
  DataSourceTypesEnum,
  GraphData
} from '../../redux/graphs/types';
import {
  DataColumns,
  DataColumnsApiPayload,
  DataValue
} from '../../redux/vizbuilder/types';
import { isDateType } from '../../redux/vizbuilder/utilities';
import { DataColumnsRecord } from './types';

export function convertDataColumnsPayloadToQuery(
  payload: DataColumnsApiPayload
): string {
  const baseQueryString = `?tableName=${payload.datasetName}`;
  const baseQueryParameterString = '&columns=';
  const initialQueryValues = [baseQueryString, ...payload.columnNames];
  return initialQueryValues.join(baseQueryParameterString);
}

export function convertDataSourcesToDataColumnsPayload(
  payload: DataSource[]
): DataColumnsApiPayload {
  let datasetName = '';
  const columnNames: string[] = [];
  payload.forEach(dataSource => {
    // All dataset names in dataSource will be the same since only
    // one dataset is allowed per graph.
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

/*
 * The data retrieved from the backend is by row.
 * This converts the data into a dictionary that
 * maps a columnName to its values.
 */
function convertDataRowsToColumns(
  data: DataValue[][],
  columnNames: string[]
): DataColumnsRecord {
  const columns: DataColumnsRecord = {};
  data.forEach(dataRow => {
    dataRow.forEach((columnValue, columnIndex) => {
      const columnName = columnNames[columnIndex];
      // create an empty array for new keys
      if (!(columnName in columns)) {
        columns[columnName] = [];
      }
      // Dates are the only values that need to be converted
      columns[columnName].push(
        isDateType(columnValue) ? new Date(columnValue) : columnValue
      );
    });
  });
  return columns;
}
