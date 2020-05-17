import Highcharts, {
  AccessibilityOptions,
  Axis,
  AxisSetExtremesEventCallbackFunction,
  AxisSetExtremesEventObject,
  Chart3dOptions,
  ChartOptions,
  ExportingOptions,
  PlotOptions,
  PositionObject,
  ResponsiveOptions,
  SubtitleOptions,
  TitleOptions,
  TooltipOptions,
  TooltipPositionerCallbackFunction,
  XAxisLabelsOptions,
  XAxisOptions,
  YAxisOptions,
  ColorString
} from 'highcharts';
import {
  ACCESSIBILITY_ANNOUNCE_NEW_DATA_ENABLED,
  DEFAULT_SUBTITLE,
  DEFAULT_TITLE,
  GRAPH_3D_ALPHA,
  GRAPH_3D_BETA,
  GRAPH_3D_DEPTH,
  GRAPH_3D_ENABLED,
  GRAPH_3D_PLOT_DEPTH,
  GRAPH_3D_SKEWED_X_AXIS_LABELS_ENABLED,
  GRAPH_3D_VIEW_DISTANCE,
  GRAPH_HEIGHT,
  GRAPH_MAX_WIDTH,
  GRAPH_PANNING_ENABLED,
  GRAPH_PANNING_KEY,
  GRAPH_SERIES_ALLOW_POINT_SELECT,
  GRAPH_SERIES_DATA_LABELS_ENABLED,
  GRAPH_SYNC_TOOLTIP_BACKGROUND_COLOR,
  GRAPH_SYNC_TOOLTIP_BORDER_RADIUS,
  GRAPH_SYNC_TOOLTIP_BORDER_WIDTH,
  GRAPH_SYNC_TOOLTIP_HEADER_FORMAT,
  GRAPH_SYNC_TOOLTIP_POINT_FORMAT,
  GRAPH_SYNC_TOOLTIP_REFERENCE_POINT_X,
  GRAPH_SYNC_TOOLTIP_REFERENCE_POINT_Y,
  GRAPH_SYNC_TRIGGER,
  GRAPH_SYNC_TOOLTIP_SHADOW_ENABLED,
  GRAPH_SYNC_TOOLTIP_SPLIT_ENABLED,
  GRAPH_X_AXIS_CROSSHAIR_ENABLED,
  GRAPH_ZOOM_TYPE,
  RESPONSIVE_LEGEND_ALIGNMENT,
  RESPONSIVE_LEGEND_LAYOUT,
  RESPONSIVE_LEGEND_VERTICAL_ALIGNMENT
} from './constants';

/*
 * The following objects correspond to the Highcharts chart
 * options that are used to render a chart. Some options
 * can be applied to all charts (e.g. title), while others
 * are specific to a type of chart (e.g. chartOptions3d).
 * The "OptionsBuilder" simply pulls from this pool of options
 * to create a chart.
 * - see https://www.highcharts.com/docs/getting-started/how-to-set-options
 *    for more information about the Highcharts options object
 */

/*
 * The title of the chart
 * - can be applied to all charts
 */
export const title: TitleOptions = { text: DEFAULT_TITLE };

/*
 * The subtitle of the chart
//  * - can be applied to all chart
 */
export const subtitle: SubtitleOptions = { text: DEFAULT_SUBTITLE };

/*
 * The colors of the chart
//  * - can be applied to all chart
 */
export const colors: ColorString[] = [
  '#4572A7',
  '#AA4643',
  '#89A54E',
  '#80699B',
  '#3D96AE',
  '#DB843D',
  '#92A8CD',
  '#A47D7C',
  '#B5CA92'
];

/*
 * The global options for a chart
 * - can be applied to all charts
 */
export const chartOptions: ChartOptions = {
  height: GRAPH_HEIGHT,
  zoomType: GRAPH_ZOOM_TYPE,
  panKey: GRAPH_PANNING_KEY,
  panning: { enabled: GRAPH_PANNING_ENABLED }
};

/*
 * The series-specific options
 * - can be applied to all charts
 */
export const plotOptions: PlotOptions = {
  series: { allowPointSelect: GRAPH_SERIES_ALLOW_POINT_SELECT },
  column: { depth: GRAPH_3D_PLOT_DEPTH },
  bar: { depth: GRAPH_3D_PLOT_DEPTH },
  pie: { depth: GRAPH_3D_PLOT_DEPTH }
};

/*
 * The x-axis options
 * - can be applied to all charts
 */
export const xAxis: XAxisOptions = {
  crosshair: GRAPH_X_AXIS_CROSSHAIR_ENABLED
};

/*
 * The y-axis options
 * This is an array, as a chart can have multiple y-axes
 * - can be applied to all charts
 */
export const yAxis: YAxisOptions[] = [{}];

/*
 * Allows the chart to be responsive
 * - can be applied to all charts
 */
export const responsiveOptions: ResponsiveOptions = {
  rules: [
    {
      condition: { maxWidth: GRAPH_MAX_WIDTH },
      chartOptions: {
        legend: {
          layout: RESPONSIVE_LEGEND_LAYOUT,
          align: RESPONSIVE_LEGEND_ALIGNMENT,
          verticalAlign: RESPONSIVE_LEGEND_VERTICAL_ALIGNMENT
        },
        yAxis: { title: { text: undefined } },
        subtitle: { text: undefined },
        credits: { enabled: undefined }
      }
    }
  ]
};

/*
 * Allows drilldown to be used
 * - can be applied to all charts
 */
export const accessibilityOptions: AccessibilityOptions = {
  announceNewData: { enabled: ACCESSIBILITY_ANNOUNCE_NEW_DATA_ENABLED }
};

/*
 * The options for how a chart will be displayed when it is exported
 * - can be applied to all charts
 */
export const exportingOptions: ExportingOptions = {
  chartOptions: {
    plotOptions: {
      series: { dataLabels: { enabled: GRAPH_SERIES_DATA_LABELS_ENABLED } }
    }
  }
};

/*
 * The 3D global chart options needed to render a 3D chart
 * - only applies to 3D charts
 */
export const chartOptions3D: Chart3dOptions = {
  enabled: GRAPH_3D_ENABLED,
  alpha: GRAPH_3D_ALPHA,
  beta: GRAPH_3D_BETA,
  viewDistance: GRAPH_3D_VIEW_DISTANCE,
  depth: GRAPH_3D_DEPTH
};

/*
 * The 3D options for the x-axis labels
 * - only applies to 3D charts
 */
export const xAxisLabels3D: XAxisLabelsOptions = {
  skew3d: GRAPH_3D_SKEWED_X_AXIS_LABELS_ENABLED
};

/*
 * This changes the tooltip default position.
 * - see https://api.highcharts.com/highcharts/tooltip.positioner
 *   for more information
 */
export const tooltipPositioner: TooltipPositionerCallbackFunction = function(): PositionObject {
  return {
    x: GRAPH_SYNC_TOOLTIP_REFERENCE_POINT_X,
    y: GRAPH_SYNC_TOOLTIP_REFERENCE_POINT_Y
  };
};

/*
 * The tooltip for the synchronized chart
 * - only applies to synchronized charts
 */
export const syncToolTip: TooltipOptions = {
  backgroundColor: GRAPH_SYNC_TOOLTIP_BACKGROUND_COLOR,
  borderWidth: GRAPH_SYNC_TOOLTIP_BORDER_WIDTH,
  borderRadius: GRAPH_SYNC_TOOLTIP_BORDER_RADIUS,
  headerFormat: GRAPH_SYNC_TOOLTIP_HEADER_FORMAT,
  pointFormat: GRAPH_SYNC_TOOLTIP_POINT_FORMAT,
  shadow: GRAPH_SYNC_TOOLTIP_SHADOW_ENABLED,
  split: GRAPH_SYNC_TOOLTIP_SPLIT_ENABLED,
  positioner: tooltipPositioner
};

/*
 * The x-axis events options
 * This allows each chart to synchronized their x-axis extreme values
 * - only applies to synchronized charts
 * - see https://www.highcharts.com/demo/synchronized-charts
 *   for more information about the syncExtremes function
 */
export const syncExtremes: AxisSetExtremesEventCallbackFunction = function(
  this: Axis,
  event: AxisSetExtremesEventObject
): void {
  const thisChart = this.chart;
  // for each synchronized chart, set the extremes if not already set
  if (event.trigger !== GRAPH_SYNC_TRIGGER) {
    // prevent feedback loop
    Highcharts.each(Highcharts.charts, function(chart: Highcharts.Chart) {
      if (chart !== thisChart) {
        if (chart.xAxis[0].setExtremes) {
          // It is null while updating
          chart.xAxis[0].setExtremes(event.min, event.max, undefined, false, {
            trigger: GRAPH_SYNC_TRIGGER
          });
        }
      }
    });
  }
};
