import {
  AccessibilityOptions,
  ChartOptions,
  ColorString,
  DrilldownOptions,
  ExportingOptions,
  PlotOptions,
  ResponsiveOptions,
  SeriesAreaOptions,
  SeriesAreasplineOptions,
  SeriesBarOptions,
  SeriesColumnOptions,
  SeriesLineOptions,
  SeriesPieOptions,
  SeriesSplineOptions,
  SubtitleOptions,
  TitleOptions,
  TooltipOptions,
  XAxisOptions,
  YAxisOptions
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
  colors: ColorString[];
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
 * The series types are grouped as either primary or secondary types
 * as secondary types may have incompatible property types. For instance,
 * a pie series is the only type that contains the size property as
 * well as the only type that does not contain the stacking property.
 *  1. Primary Series Types: line, spline, column, bar, area, areaspline
 *  2. Secondary Series Types: pie
 */

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
 * of "series", which is a property in the Highcharts options object.
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
 * Each of the graph types consists of a different subset of series
 * types, each of which are rendered on a chart.
 * There are three main graph types:
 *  1. Basic Graph: Multiple Primary Series or 1 Secondary Series
 *  2. Combined Graph: Multiple Primary Series & 1 Secondary Series
 *  3. Synchronized Graph: Multiple Primary Series
 */

/*
 * The series (highcharts property) type for a "Basic" graph.
 * Basic Graph: Multiple Primary Series or 1 Secondary Series
 */
export type SeriesListBasic = PrimarySeries[] | [SecondarySeries];

/*
 * The highcharts options object type for a "Basic" graph
 */
export interface GraphOptionsBasic extends GraphOptionsGeneral {
  series: SeriesListBasic;
}

/*
 * The series (highcharts property) type for a "Combined" graph
 * Combined Graph: Multiple Primary Series & 1 Secondary Series
 */
export type SeriesListCombined = (PrimarySeries | SecondarySeries)[];

/*
 * The highcharts options object type for a "Combined" graph
 */
export interface GraphOptionsCombined extends GraphOptionsGeneral {
  series: SeriesListCombined;
}

/*
 * The series (highcharts property) type for a "Synchronized" graph
 * Synchronized Graph: Multiple Primary Series
 */
export type SeriesListSynchronized = [PrimarySeries];

/*
 * The highcharts options object type for a "Synchronized" graph
 */
export interface GraphOptionsSynchronized extends GraphOptionsGeneral {
  series: SeriesListSynchronized;
}

/*
 * Any of the supported options object types
 */
export type GraphOptionsType =
  | GraphOptionsBasic
  | GraphOptionsCombined
  | GraphOptionsSynchronized;

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
export type DataValue = string | number | Date | null;

/*
 * Highcharts x-axis value type constraints
 */
export type GraphDataXValue = number | string;

/*
 * Highcharts stack value type constraints
 */
export type GraphDataStackValue = number | string | undefined;

/*
 * Highcharts y-axis value type constraints
 */
export type GraphDataYValue = number | null;

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
 * The x-axis data information
 * This is used as an intermediary configuration to pass both the x-axis
 * data type and the converted x-axis data
 */
export interface XAxisDataConfig {
  xAxisType: XAxisDataType;
  xAxisData: GraphDataXValue[];
}

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
  stackData: GraphDataStackValue[];
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
  subtitle?: string;
  stackData?: DataValue[];
  xConfig?: XAxisConfiguration;
  yConfig?: YAxisConfiguration;
  stackConfig?: StackConfiguration;
  timeSeries?: boolean;
}

export interface SeriesConfiguration {
  seriesType: string;
  name?: string;
  color?: string;
  dataLabels?: boolean;
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

/*
 * The final Graph object outputted by the Graph Creator;
 */
export interface Graph {
  /*
   * The options object passed into highcharts
   */
  graphOptions: GraphOptionsType[];
  /*
   * The x-axis data type that determined the
   * chart constructor (highchart or highstocks)
   */
  xAxisDataType: XAxisDataType;
}
