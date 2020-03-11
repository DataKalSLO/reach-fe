import {
  TitleOptions,
  SubtitleOptions,
  ChartOptions,
  PlotOptions,
  XAxisOptions,
  YAxisOptions,
  ResponsiveOptions,
  AccessibilityOptions,
  ExportingOptions,
  Chart3dOptions,
  XAxisLabelsOptions,
  TooltipOptions,
  AxisSetExtremesEventCallbackFunction,
  Axis,
  AxisSetExtremesEventObject
} from 'highcharts';
import Highcharts from 'highcharts/highstock';
import * as cnst from './constants';

/*
 * The following objects correspond to Highcharts chart
 * options that are used to render a chart. Some options
 * can be applied to all charts (e.g. title), while others
 * are specific to the type of chart (e.g. chartOptions3d).
 * The Options Builder simply pulls from this pool of options
 * to create a chart.
 * - see https://www.highcharts.com/docs/getting-started/how-to-set-options
 *    for more information about the Hicharts options object
 */

/* The title of the chart (can be applied to all charts) */
export const title: TitleOptions = {};

/* The subtitle of the chart (can be applied to all charts) */
export const subtitle: SubtitleOptions = {
  text: cnst.DEFAULT_SUBTITLE
};

/* The global options for a chart (can be applied to all charts) */
export const chartOptions: ChartOptions = {
  zoomType: cnst.DEFAULT_ZOOM_TYPE,
  panning: { enabled: true },
  panKey: cnst.PANNING_KEY
};

/* The chart-specific options (can be applied to all charts) */
export const plotOptions: PlotOptions = {
  series: { stacking: cnst.DEFAULT_STACKING_TYPE, allowPointSelect: true },
  area: { stacking: cnst.DEFAULT_STACKING_TYPE, allowPointSelect: true },
  pie: { allowPointSelect: true, depth: cnst.DEFAULT_3D_PLOT_DEPTH },
  column: {
    stacking: cnst.DEFAULT_STACKING_TYPE,
    allowPointSelect: true,
    depth: cnst.DEFAULT_3D_PLOT_DEPTH
  },
  bar: {
    stacking: cnst.DEFAULT_STACKING_TYPE,
    allowPointSelect: true,
    depth: cnst.DEFAULT_3D_PLOT_DEPTH
  }
};

/* The x-axis options (can be applied to all charts) */
export const xAxis: XAxisOptions = {
  crosshair: true
};

/* The y-axis options (can be applied to all charts) */
/* This is an array, as a chart can have multiple y-axes */
export const yAxis: YAxisOptions[] = [];

/* Allow the chart to be responsive (can be applied to all charts) */
export const responsiveOptions: ResponsiveOptions = {
  rules: [
    {
      condition: { maxWidth: cnst.DEFAULT_MAX_WIDTH },
      chartOptions: {
        legend: {
          layout: cnst.RESPONSIVE_LEGEND_LAYOUT,
          align: cnst.RESPONSIVE_LEGEND_ALIGNMENT,
          verticalAlign: cnst.RESPONSIVE_LEGEND_VERTICAL_ALIGNMENT
        },
        yAxis: { title: { text: undefined } },
        subtitle: { text: undefined },
        credits: { enabled: undefined }
      }
    }
  ]
};

/* Allows drilldown to be used (can be applied to all charts) */
export const accessibilityOptions: AccessibilityOptions = {
  announceNewData: { enabled: true }
};

/* The options for how a chart will be displayed when its exported */
/* (can be applied to all charts) */
export const exportingOptions: ExportingOptions = {
  chartOptions: {
    plotOptions: {
      series: { dataLabels: { enabled: true } }
    }
  }
};

/* The 3D global chart options needed to render a 3D chart 
/* (only applies to 3D charts) */
export const chartOptions3D: Chart3dOptions = {
  enabled: true,
  alpha: cnst.DEFAULT_3D_ALPHA,
  beta: cnst.DEFAULT_3D_BETA,
  viewDistance: cnst.DEFAULT_3D_VIEW_DISTANCE,
  depth: cnst.DEFAULT_3D_DEPTH
};

/* The 3D options for the x-axis labels (only applies to 3D charts) */
export const xAxisLabels3D: XAxisLabelsOptions = {
  skew3d: true
};

/* The tooltip for the synchronized chart */
/* (only applies to synchronized charts) */
export const syncToolTip: TooltipOptions = {
  backgroundColor: cnst.SYNCH_TOOLTIP_BACKGROUND_COLOR,
  borderWidth: cnst.SYNCH_TOOLTIP_BORDER_WIDTH,
  borderRadius: cnst.SYNCH_TOOLTIP_BORDER_RADIUS,
  headerFormat: cnst.SYNCH_TOOLTIP_HEADER_FORMAT,
  pointFormat: cnst.SYNCH_TOOLTIP_POINT_FORMAT,
  shadow: false,
  split: false,
  positioner: function() {
    return { x: 10, y: 35 };
  }
};

/* The x-axis events options (only appies to synchronized charts) */
/* This allows each chart to synchronized their x-axis extreme values */
export const syncExtremes: AxisSetExtremesEventCallbackFunction = function(
  this: Axis,
  evt: AxisSetExtremesEventObject
): void {
  const thisChart = this.chart;
  // for each synchronized chart, set the extremes if not already set
  if (evt.trigger !== cnst.SYNCH_TRIGGER) {
    // prevent feedback loop
    Highcharts.each(Highcharts.charts, function(chart: Highcharts.Chart) {
      if (chart !== thisChart) {
        if (chart.xAxis[0].setExtremes) {
          // It is null while updating
          chart.xAxis[0].setExtremes(evt.min, evt.max, undefined, false, {
            trigger: cnst.SYNCH_TRIGGER
          });
        }
      }
    });
  }
};
