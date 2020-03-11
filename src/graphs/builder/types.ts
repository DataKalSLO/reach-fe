import Highcharts, {
  TitleOptions,
  SubtitleOptions,
  PlotOptions,
  ResponsiveOptions,
  AccessibilityOptions,
  ExportingOptions,
  XAxisOptions,
  YAxisOptions,
  ChartOptions,
  DrilldownOptions,
  TooltipOptions,
  SeriesLineOptions,
  SeriesSplineOptions,
  SeriesColumnOptions,
  SeriesBarOptions,
  SeriesAreaOptions,
  SeriesAreasplineOptions,
  SeriesPieOptions
} from 'highcharts';

/*
 * The following type aliases/interfaces represent the
 * Highcharts options object and its properties, which
 * are given to a Highcharts Component to render a chart.
 * The type aliases/interfaces are used to add constraints
 * to the charts that can be created.
 * e.g. requiring every chart to be responsive
 * - see https://www.highcharts.com/docs/getting-started/how-to-set-options
 *    for more information about the Hicharts options object
 */

/* General options that each graph will be initialized with */
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

/**
 * Each graph takes in a list of series, where each series
 * represents one set of data that can be plotted on a graph.
 * "series" is simply another property in the options object.
 * - see https://www.highcharts.com/docs/chart-concepts/series
 *    for more information about the Hicharts series object
 */

/*
 * There are four main graph types; basic, combined, 3D,
 * and synchronized. Each graph type consists of a specific
 * subsetet of series types.
 * Note: Enums are used for runtime type checking
 * Note: A synchornized graph is simply a collection of
 *       basic graphs; therefore, a type is not needed
 */

/* The supported series types for a "Basic" graph */
export enum graphBasicTypesEnum {
  line = 'line',
  spline = 'spline',
  column = 'column',
  bar = 'bar',
  area = 'area',
  areaspline = 'areaspline'
}
export type GraphBasicTypes = keyof typeof graphBasicTypesEnum;

/*
 * The supported series type for a pie graph.
 * For both the "Basic" and the "3D" graphs, a pie series may
 * only be rendered on its own; this is the reason for which it
 * was separted into a separate type.
 */
export enum graphPieTypesEnum {
  pie = 'pie'
}

export type GraphPieTypes = keyof typeof graphPieTypesEnum;

/* The supported series type for a "3D" graph. */
export enum graph3DTypesEnum {
  column = 'column',
  bar = 'bar'
}
export type Graph3DTypes = keyof typeof graph3DTypesEnum;

/*
 * The supported series type for a "Combined" graph.
 * This is the only graph for which a pie series may be
 * rended with another series.
 */
export enum graphCombinedTypesEnum {
  line = 'line',
  spline = 'spline',
  column = 'column',
  bar = 'bar',
  area = 'area',
  areaspline = 'areaspline',
  pie = 'pie'
}
export type GraphCombinedTypes = keyof typeof graphCombinedTypesEnum;

/* These required to pass an enum as a argument */
export type GraphBasicEnumTypes = typeof graphBasicTypesEnum;
export type GraphPieEnumTypes = typeof graphPieTypesEnum;
export type Graph3DEnumTypes = typeof graph3DTypesEnum;
export type GraphCombinedEnumTypes = typeof graphCombinedTypesEnum;

/* Required to be any of the supported enum types */
export type GraphEnumTypes =
  | GraphBasicEnumTypes
  | GraphPieEnumTypes
  | Graph3DEnumTypes
  | GraphCombinedEnumTypes;

/*
 * The following type aliases/interfaces represent the type
 * of "series" which is a property in the Highcharts options object.
 * Note: the "series" property is a list of SeriesOptions, a type
 *        defined by Highcharts
 */

/* The series (a property) type for a "Basic" graph */
export interface GraphOptionsBasic extends GraphOptionsGeneral {
  series: SeriesListBasic | SeriesListPie;
}

/*
 * The specific SeriesOptions for each series type supported by
 * a "Basic" graph.
 */
export type SeriesListBasic = SeriesBasic[];
export type SeriesBasic =
  | SeriesLineOptions
  | SeriesSplineOptions
  | SeriesColumnOptions
  | SeriesBarOptions
  | SeriesAreaOptions
  | SeriesAreasplineOptions;

/*
 * The seriesOption for a pie series.
 * Again, this is separated as only one can be rendered
 * at a time for both "3D" and "Basic" graphs.
 */
export type SeriesListPie = [SeriesPie];
export type SeriesPie = SeriesPieOptions;

/* The series (a property) type for a "3D" graph */
export interface GraphOptions3D extends GraphOptionsGeneral {
  series: SeriesList3D | SeriesListPie;
}

/*
 * The specific SeriesOptions for each series type supported by
 * a "3D" graph.
 */
export type SeriesList3D = Series3D[];
export type Series3D = SeriesColumnOptions | SeriesBarOptions;

/* The series (a property) type for a "3D" graph */
export interface GraphOptionsCombined extends GraphOptionsGeneral {
  series: SeriesListCombined;
}
/*
 * The specific SeriesOptions for each series type supported by
 * a "Combined" graph.
 */
export type SeriesListCombined = SeriesCombined[];
export type SeriesCombined =
  | SeriesLineOptions
  | SeriesSplineOptions
  | SeriesColumnOptions
  | SeriesBarOptions
  | SeriesAreaOptions
  | SeriesAreasplineOptions
  | SeriesPieOptions;

/* The series (a property) type for a "3D" graph */
export interface GraphOptionsSynchronized extends GraphOptionsGeneral {
  series: SeriesListSynchronized;
}

/*
 * The specific SeriesOptions for each series type supported by
 * a "Synchronized" graph.
 */
export type SeriesListSynchronized = [SeriesSynchronized];
export type SeriesSynchronized =
  | SeriesLineOptions
  | SeriesSplineOptions
  | SeriesColumnOptions
  | SeriesBarOptions
  | SeriesAreaOptions
  | SeriesAreasplineOptions;

/* Required to be any of the supported options types */
export type GraphOptionsType =
  | GraphOptionsBasic
  | GraphOptions3D
  | GraphOptionsCombined
  | GraphOptionsSynchronized;

/*
 * Each seriesOptions contains a "data" property where.
 * The "DatatType" property is a subset of Highcarts'
 * defined type. This type constrains data points to be either
 * number (for date) or strings on the x-axis, and numbers
 * on the y-axis.
 */
export type DataType = [number | string, number][];

/* used to identify one series in a graph*/
export type SeriesIdPair = { title: string; id: string };

/*
 * The folloiwng type aliases are used to define the
 * object that is used to create a graph. This contains
 * the required configurations needed create the options
 * object.
 */

/*
 * This is passed to each of the methods of the "Graph Creator"
 * to create a graph
 * e.g. graphCreator.createBasiGraph(config: GraphConfiguration)
 */
export interface GraphConfiguration {
  graph: { title: string };
  xAxis: { title: string; axisType: 'category' | 'datetime' };
  seriesConfigs: SeriesConfiguration[];
}

/* A set of configurations required to create a series */
export interface SeriesConfiguration {
  yAxisTitle: string;
  isMultiAxis: boolean;
  seriesId: string;
  seriesType: string;
  stack: string;
  data: DataType;
}

/* Required to constrain the x-axis to only these types */
export type XAxisType = 'category' | 'datetime';

/*
 * Required to render graphs using different libraries
 * e.g. "highStocks" | "highCharts"
 */
export type Constructor = keyof typeof Highcharts;
