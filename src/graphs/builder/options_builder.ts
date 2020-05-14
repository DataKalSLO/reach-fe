import { isUndefined } from 'util';
import {
  DEFAULT_STACK_TYPE,
  DEFAULT_SUBTITLE_WITH_SOURCE,
  GRAPH_COMBINED_CENTER_X,
  GRAPH_COMBINED_CENTER_Y,
  GRAPH_SYNC_ID,
  GRAPH_SYNC_MARGIN_LEFT,
  GRAPH_SYNC_SPACING_BOTTOM,
  GRAPH_SYNC_SPACING_TOP,
  TOOLTIP_STACK_FOOTER_PREFIX,
  TOOLTIP_STACK_FOOTER_VALUE,
  X_AXIS_CATEGORY_TYPE
} from './constants';
import {
  accessibilityOptions,
  chartOptions,
  chartOptions3D,
  exportingOptions,
  plotOptions,
  responsiveOptions,
  subtitle,
  syncExtremes,
  syncToolTip,
  title,
  xAxis,
  xAxisLabels3D,
  yAxis
} from './default-graph-options';
import {
  DataConfiguration,
  GraphOptionsGeneral,
  StackConfiguration,
  XAxisConfiguration,
  YAxisConfiguration,
  DataValue
} from './types';
import { getEmptyStringIfUndefined } from './utilities';

/*
 * This class is responsible for creating the graph options
 * object needed to render a graph using the Highcharts library.
 * The OptionsBuilder defines a list of methods that
 * each generate one part of the options. A combination
 * of methods can be called to generate different options
 * objects thereby, rendering different graphs.
 * - for more information about the Highcharts options object
 *   see https://www.highcharts.types.com/docs/getting-started/how-to-set-options
 */

export default class OptionsBuilder {
  private generalGraphOptions!: GraphOptionsGeneral;

  constructor() {
    this.resetOptions();
  }

  /*
   * These are the general options that apply to all graphs
   */
  private resetOptions() {
    this.generalGraphOptions = {
      title: { ...title },
      subtitle: { ...subtitle },
      chart: { ...chartOptions },
      plotOptions: { ...plotOptions },
      responsive: { ...responsiveOptions },
      accessibility: { ...accessibilityOptions },
      exporting: { ...exportingOptions },
      xAxis: { ...xAxis },
      yAxis: [...yAxis]
    };
  }

  public withGraphTitle(title?: string) {
    if (!isUndefined(title)) {
      this.generalGraphOptions.title.text = title;
    }
  }

  public withGraphSourceURL(url?: string) {
    if (!isUndefined(url)) {
      this.generalGraphOptions.subtitle.text =
        DEFAULT_SUBTITLE_WITH_SOURCE + url;
    }
  }

  /*
   * The categories property has to be specified for categorical values
   * in order to properly render the x-axis labels.
   */
  public withXAxisDataType(dataConfig: DataConfiguration) {
    const isCategorical = dataConfig.xAxisType === X_AXIS_CATEGORY_TYPE;
    this.generalGraphOptions.xAxis = {
      ...this.generalGraphOptions.xAxis, // do not override existing options
      type: dataConfig.xAxisType,
      categories: isCategorical ? (dataConfig.xAxisData as string[]) : undefined
    };
  }

  public withXAxis(xConfig?: XAxisConfiguration) {
    if (!isUndefined(xConfig)) {
      const title = getEmptyStringIfUndefined(xConfig.title);
      const valuePrefix = getEmptyStringIfUndefined(xConfig.valuePrefix);
      const valueSuffix = getEmptyStringIfUndefined(xConfig.valueSuffix);
      this.generalGraphOptions.xAxis = {
        ...this.generalGraphOptions.xAxis, // do not override existing options
        title: { text: title },
        labels: {
          // add the prefix/suffix the x-axis labels
          formatter: function() {
            return (
              valuePrefix +
              // use the automatic formatting provided by highcharts
              this.axis.defaultLabelFormatter.call(this) +
              valueSuffix
            );
          }
        }
      };
    }
  }

  // TODO: support multiple y-axis
  public withYAxis(yConfig?: YAxisConfiguration) {
    if (!isUndefined(yConfig)) {
      const title = getEmptyStringIfUndefined(yConfig.title);
      const valuePrefix = getEmptyStringIfUndefined(yConfig.valuePrefix);
      const valueSuffix = getEmptyStringIfUndefined(yConfig.valueSuffix);
      // this is a list since highcharts supports multiple y-axes
      this.generalGraphOptions.yAxis = [
        {
          title: { text: title },
          labels: {
            // add the prefix/suffix to the y-axis labels
            formatter: function() {
              return (
                valuePrefix +
                // use the automatic formatting provided by highcharts
                this.axis.defaultLabelFormatter.call(this) +
                valueSuffix
              );
            }
          }
        }
      ];
      // add the prefix/suffix to the tooltip
      this.generalGraphOptions.tooltip = {
        ...this.generalGraphOptions.tooltip, // do not override existing options
        valuePrefix: valuePrefix,
        valueSuffix: valueSuffix
      };
    }
    return this;
  }

  /*
   * Enable stacking
   */
  public withStack(stackData?: DataValue[]) {
    if (!isUndefined(stackData)) {
      this.generalGraphOptions.plotOptions.series = {
        ...plotOptions.series, // do not override existing options
        stacking: DEFAULT_STACK_TYPE
      };
    }
  }

  /*
   * Modify the tooltip and stack type with the information
   * provided in the stack configuration.
   */
  public withStackOptions(stackConfig?: StackConfiguration) {
    if (!isUndefined(stackConfig)) {
      // change tooltip format to include stack information in the footer
      let tooltipPrefix = TOOLTIP_STACK_FOOTER_PREFIX;
      const tooltipLabel = TOOLTIP_STACK_FOOTER_VALUE;
      if (!isUndefined(stackConfig.title)) {
        tooltipPrefix = stackConfig.title;
      }
      this.generalGraphOptions.tooltip = {
        ...this.generalGraphOptions.tooltip, // do not override existing options
        footerFormat: tooltipPrefix + tooltipLabel
      };
      // change stack type
      if (!isUndefined(stackConfig.type)) {
        this.generalGraphOptions.plotOptions.series = {
          ...this.generalGraphOptions.plotOptions.series,
          stacking: stackConfig.type
        };
      }
    }
  }

  /*
   * Add options required for a Combined Graph
   */
  public withCombinedOptions() {
    this.generalGraphOptions.plotOptions.pie = {
      ...plotOptions.pie,
      showInLegend: false,
      dataLabels: { enabled: true },
      center: [GRAPH_COMBINED_CENTER_X, GRAPH_COMBINED_CENTER_Y]
    };
  }

  /*
   * Add options required for a 3D Graph
   */
  public with3DOptions() {
    this.generalGraphOptions.chart.options3d = chartOptions3D;
    this.generalGraphOptions.xAxis.labels = xAxisLabels3D;
  }

  /*
   * Add options required for a Synchronized Graph
   */
  public withSynchronizedOptions() {
    this.generalGraphOptions.chart.marginLeft = GRAPH_SYNC_MARGIN_LEFT;
    this.generalGraphOptions.chart.spacingTop = GRAPH_SYNC_SPACING_TOP;
    this.generalGraphOptions.chart.spacingBottom = GRAPH_SYNC_SPACING_BOTTOM;
    this.generalGraphOptions.chart.className = GRAPH_SYNC_ID;
    this.generalGraphOptions.tooltip = syncToolTip;
    this.generalGraphOptions.xAxis.events = {
      setExtremes: syncExtremes
    };
  }

  /*
   * The options reset after they are created and retrieved
   */
  public getOptions(): GraphOptionsGeneral {
    const finishedOptions: GraphOptionsGeneral = {
      ...this.generalGraphOptions
    };
    this.resetOptions();
    return finishedOptions;
  }
}
