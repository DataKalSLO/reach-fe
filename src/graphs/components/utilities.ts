import { GraphData, SeriesData, ValueColumn } from './types';
import { Column, DataValue } from '../../redux/vizbuilder/types';
import { isUndefined } from 'util';
import * as typs from '../builder/types';
import * as cnst from '../builder/constants';

/*
 * Converts the information given by the user to create a graph
 * (graphData), to a graph configuration that allows the GraphCreator
 * to create the needed graphs.
 */
export function convertGraphDataToGraphConfig(
  graphData: GraphData
): typs.GraphConfiguration {
  const { graphTitle, xAxisTitle, seriesData } = graphData;
  // get the x-axis information
  const xAxisType = getXAxisType(seriesData);
  // get the required information for each series
  const seriesConfigList: typs.SeriesConfiguration[] = seriesData.map(
    (series, index) => {
      const {
        seriesType,
        data,
        stackId: stackBy,
        yAxisTitle,
        isMultiAxis
      } = series;
      return {
        yAxisTitle: !isUndefined(yAxisTitle) ? yAxisTitle : '',
        isMultiAxis: !isUndefined(isMultiAxis) ? isMultiAxis : false,
        stack: !isUndefined(stackBy) ? stackBy : index.toString(),
        name: data[0].name,
        seriesId: index.toString(),
        seriesType: seriesType,
        data: convertDataTypeToXAxisType(xAxisType, data)
      };
    }
  );

  // create the graph configuration
  const config: typs.GraphConfiguration = {
    graph: { title: !isUndefined(graphTitle) ? graphTitle : '' },
    xAxis: {
      title: !isUndefined(xAxisTitle) ? xAxisTitle : '',
      axisType: xAxisType
    },
    seriesConfigs: seriesConfigList
  };

  return config;
}

/*
 * Computes the x-axis type by the values of the data
 */
export function getXAxisType(seriesData: SeriesData[]): typs.XAxisType {
  const categoryTypes: SeriesData[] = seriesData.filter(
    (element: SeriesData) => {
      const xAxisData: Column = element.data[0];
      const xAxisDataValue: DataValue = xAxisData.values[0];
      return isCategoryType(xAxisDataValue);
    }
  );
  // get the x-axis type (either categorical or time series)
  if (categoryTypes.length > 0) {
    // if any of the series are categorical use categorical
    return cnst.X_AXIS_CATEGORY_TYPE;
  }
  // only use time series if all the serires are time series
  return cnst.X_AXIS_TIMESERIES_TYPE;
}

/*
 * Converts each of the values for the x-axis to the appropriate type
 * for the given x-axis type.
 * - categorical values must be stirngs
 * - timeseries values must be numbers (Unix timestamps for HighStocks)
 * - Note: "Column" type can only contain strings, numbers or Date
 */
export function convertDataTypeToXAxisType(
  xAxisType: typs.XAxisType,
  data: [Column, ValueColumn]
): typs.DataType {
  const xAxisData: Column = data[0];
  const newXAxisValues: (number | string)[] = xAxisData.values.map(
    (value: DataValue) => {
      let newValue: number | string = value.toString();
      // convert categorical x-axis values
      if (xAxisType === cnst.X_AXIS_CATEGORY_TYPE) {
        if (typeof value === 'number') {
          newValue = value.toString();
        } else if (typeof value !== 'string') {
          const dateValue: Date = value;
          newValue = dateValue.toDateString();
        }
      } else {
        // if the value is not a number or a string, must be a Date
        // convert to time series values
        newValue = new Date(value).getTime();
      }
      return newValue;
    }
  );
  const yAxisColumn: ValueColumn = data[1];
  // convert the values to the Graph Data Type (subset of Highcharts Type)
  const dataValues: typs.DataType = newXAxisValues.map((value, index) => {
    return [value, yAxisColumn.values[index]];
  });
  return dataValues;
}

/*
 * Checks if a value is categorical.
 * DataValue can only be a number, string or Date
 */
export function isCategoryType(value: DataValue): boolean {
  // If the value is not a Date, then the value is classified as categorical
  return typeof value === 'number' || typeof value === 'string';
}
