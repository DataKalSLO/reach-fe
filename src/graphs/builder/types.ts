import {
  AccessibilityOptions,
  ChartOptions,
  DrilldownOptions,
  ExportingOptions,
  PlotOptions,
  ResponsiveOptions,
  SubtitleOptions,
  TitleOptions,
  TooltipOptions,
  XAxisOptions,
  YAxisOptions,
  SeriesPieOptions,
  SeriesLineOptions,
  SeriesSplineOptions,
  SeriesColumnOptions,
  SeriesBarOptions,
  SeriesAreaOptions,
  SeriesAreasplineOptions
} from 'highcharts';
import {
  X_AXIS_CATEGORY_TYPE,
  X_AXIS_DATETIME_TYPE,
  X_AXIS_LINEAR_TYPE
} from './constants';

/*
 * General options that each graph will be initialized with
 */
export interface GraphOptionsGeneral {
  title: TitleOptions;
  subtitle: SubtitleOptions;
  chart: ChartOptions;
  plotOptions: PlotOptions;
  responsive: ResponsiveOptions;
  accessibility: AccessibilityOptions;
  exporting: ExportingOptions;
  xAxis: XAxisOptions;
  yAxis: YAxisOptions[];
  tooltip?: TooltipOptions;
  drilldown?: DrilldownOptions;
}

/*
 * All the supported series types
 * Enums are used for runtime type checking
 */
export enum seriesTypesEnum {
  line = 'line',
  spline = 'spline',
  column = 'column',
  bar = 'bar',
  area = 'area',
  areaspline = 'areaspline',
  pie = 'pie'
}
export type SeriesTypes = keyof typeof seriesTypesEnum;

/*
 * Primary Series Types
 * Enums are used for runtime type checking
 */
const { pie, ...primarySeriesTypesEnum } = seriesTypesEnum;
export { primarySeriesTypesEnum };
export type PrimarySeriesTypes = keyof typeof primarySeriesTypesEnum;

/*
 * Secondary Series Types
 * Enums are used for runtime type checking
 */
export const secondarySeriesTypesEnum = { pie: seriesTypesEnum.pie };
export type SecondarySeriesTypes = keyof typeof secondarySeriesTypesEnum;

/*
 * The following type aliases/interfaces represent the type
 * of "series" which is a property in the Highcharts options object.
 * Note: the "series" property is a list of SeriesOptions, a type
 *       defined by Highcharts
 * - for more information about the series property
 *   see https://api.highcharts.com/highcharts/series
 */

/*
 * The specific SeriesOptions for each series group type
 */
export type SecondarySeries = SeriesPieOptions;
export type PrimarySeries =
  | SeriesLineOptions
  | SeriesSplineOptions
  | SeriesColumnOptions
  | SeriesBarOptions
  | SeriesAreaOptions
  | SeriesAreasplineOptions;

/*
 * The series (highcharts property) type for a "Basic" graph.
 * Basic Graph: Multiple Primary Series or 1 Secondary Series
 */
export type SeriesListBasic = PrimarySeries[] | [SecondarySeries];

/*
 * The series (highcharts property) type for a "3D" graph
 * 3D Graph: Multiple Primary Series or 1 Secondary Series
 */
export type SeriesList3D = PrimarySeries[] | [SecondarySeries];

/*
 * The series (highcharts property) type for a "Combined" graph
 * Combined Graph: Multiple Primary Series & 1 Secondary Series
 */
export type SeriesListCombined = (PrimarySeries | SecondarySeries)[];

/*
 * The series (highcharts property) type for a "Synchronized" graph
 * Synchronized Graph: Multiple Primary Series
 */
export type SeriesListSynchronized = [PrimarySeries];

/*
 * The following type aliases/interfaces correspond to the
 * graph data values.
 * Data Conversion Steps (from input to highcharts):
 *  1. DataValue -> GraphDataXValue
 *  2. DataValue -> GraphDataYValue
 *  3. GraphDataXValue, GraphDataYValue -> GraphData
 */

/*
 * Possible value types that can exist in a column in a dataset.
 * This type should correspond to the data values retrieved from
 * the backend when accessing columns in a dataset.
 */
export type DataValue = string | number | Date;

/*
 * Highcharts requires x-axis values to be either numbers or strings
 */
export type GraphDataXValue = number | string;

/*
 * Highcharts requires y-axis values to be numbers
 */
export type GraphDataYValue = number;

/*
 * Array of tuples containing both the x and y values.
 * Subset of Highcharts series data type
 * - for more information about the series data property
 *   see https://api.highcharts.com/highcharts/series.column.data
 */
export type GraphData = [GraphDataXValue, GraphDataYValue][];

/*
 * The x-axis data type
 * This is needed as highstocks will be used for datetime values.
 */
export type XAxisDataType =
  | typeof X_AXIS_CATEGORY_TYPE
  | typeof X_AXIS_DATETIME_TYPE
  | typeof X_AXIS_LINEAR_TYPE;

/*
 * Used as an intermediary configuration to
 * convert the data to the data type that
 * is expected by highcharts.
 */
export interface DataConfiguration {
  seriesLength: number;
  xAxisType: XAxisDataType;
  xAxisData: GraphDataXValue[];
  yAxisData: GraphDataYValue[][];
  stackData: GraphDataXValue[];
}

/*
 * The following type aliases are used to define the
 * object that is used to create a graph. This contains
 * the required configurations needed create the options
 * object.
 * TODO: support multiple y-axis
 */
export interface GraphConfiguration {
  title: string;
  xAxisData: DataValue[];
  yAxisData: DataValue[][];
  seriesConfigs: SeriesConfiguration[];
  sourceUrl?: string;
  stackData?: DataValue[];
  xConfig?: XAxisConfiguration;
  yConfig?: YAxisConfiguration;
  stackConfig?: StackConfiguration;
}

export interface SeriesConfiguration {
  seriesType: string;
  name?: string;
  color?: string;
}

export interface XAxisConfiguration {
  title?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export interface YAxisConfiguration {
  title?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export interface StackConfiguration {
  type?: 'percent' | 'normal';
  title?: string;
}
