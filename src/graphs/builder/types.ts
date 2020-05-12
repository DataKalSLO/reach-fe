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
  tooltip?: TooltipOptions;
  drilldown?: DrilldownOptions;
}

/*
 * The following type aliases/interfaces correspond to the
 * graph data values.
 * Data Conversion Steps (from input to highcharts):
 *  1. DataValue -> GraphDataXValue
 *  2. DataValue -> GraphDataYValue
 *  3. GraphDataXValue, GraphDataYValue -> GraphData
 */
export type DataValue = string | number | Date;
export type GraphDataXValue = number | string;
export type GraphDataYValue = number;
export type GraphData = [number | string, number][];

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
  type: string;
  name?: string;
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
