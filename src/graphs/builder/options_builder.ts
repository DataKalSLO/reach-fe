import * as typs from './types';
import * as ops from './graph-options';
import * as cnst from './constants';

/*
 * This class is responsible for creating the graph options
 * object needed to render a graph using the Highcharts library.
 * The OptiionsBuilder defines a list of methods that
 * each generate one part of the options. A combination
 * of methods can be called to generate different options
 * objects; thereby, rendering different types of graphs.
 * - see https://www.highcharts.com/docs/getting-started/how-to-set-options
 *    for more information about the Hicharts options object
 */

export default class OptionsBuilder {
  private generalGraphOptions!: typs.GraphOptionsGeneral;

  constructor() {
    this.resetOptions();
  }

  /* These are the general options that apply to all graphs */
  private resetOptions() {
    this.generalGraphOptions = {
      title: { ...ops.title },
      subtitle: { ...ops.subtitle },
      chart: { ...ops.chartOptions },
      plotOptions: { ...ops.plotOptions },
      responsive: { ...ops.responsiveOptions },
      accessibility: { ...ops.accessibilityOptions },
      exporting: { ...ops.exportingOptions },
      xAxis: { ...ops.xAxis },
      yAxis: [...ops.yAxis]
    };
  }

  public withTitle(title: string): void {
    this.generalGraphOptions.title.text = title;
  }

  public withXAxisTitle(title: string): void {
    this.generalGraphOptions.xAxis.title = { text: title };
  }

  /*
   * Allows multiple y-axes to be created when isMultiAxis is true,
   * the axis will appear on the opposite if isMultiAxis is true.
   * The id is used to reference the series that uses this y-axis.
   */
  public withYAxis(title: string, id: string, isMultiAxis: boolean): void {
    this.generalGraphOptions.yAxis.push({
      title: { text: title },
      id: id,
      opposite: isMultiAxis
    });
  }

  public withCategories(): void {
    this.generalGraphOptions.xAxis.type = cnst.X_AXIS_CATEGORY_TYPE;
  }

  public withTimeSeries(): void {
    this.generalGraphOptions.xAxis.type = cnst.X_AXIS_TIMESERIES_TYPE;
  }

  public with3DOptions(): void {
    this.generalGraphOptions.chart.options3d = ops.chartOptions3D;
    this.generalGraphOptions.xAxis.labels = ops.xAxisLabels3D;
  }

  public withSynchronizedOptions(): void {
    this.generalGraphOptions.chart.marginLeft = cnst.SYNCH_MARGIN_LEFT;
    this.generalGraphOptions.chart.spacingTop = cnst.SYNCH_SPACING_TOP;
    this.generalGraphOptions.chart.spacingBottom = cnst.SYNCH_SPACING_BOTTOM;
    this.generalGraphOptions.chart.className = cnst.SYNCH_GRAPH_ID;
    this.generalGraphOptions.tooltip = ops.syncToolTip;
    this.generalGraphOptions.xAxis.events = {
      setExtremes: ops.syncExtremes
    };
  }

  /* the options reset after they are created and retrieved */
  public getOptions(): typs.GraphOptionsGeneral {
    const finishedOptions: typs.GraphOptionsGeneral = {
      ...this.generalGraphOptions
    };
    this.resetOptions();
    return finishedOptions;
  }
}
