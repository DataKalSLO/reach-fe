import * as typs from './types';
import { Options } from 'highcharts';

/*
 * The graph class is a representation of a
 * graph, containing the required information to
 * both render a graph using Highcharts, and modify
 * it.
 */

export default class Graph {
  // The Highcarts Options object
  private options: typs.GraphOptionsType;
  // Required for runtime type checking
  private seriesLiteralTypes: typs.GraphEnumTypes;
  // Highcharts library that will render the graph
  private chartConstructor: string;

  constructor(
    options: typs.GraphOptionsType,
    seriesLiteralTypes: typs.GraphEnumTypes,
    chartConstructor: string
  ) {
    this.options = options;
    this.seriesLiteralTypes = seriesLiteralTypes;
    this.chartConstructor = chartConstructor;
  }

  public getOptions(): Options {
    return this.options;
  }

  public getChartConstructor(): typs.Constructor {
    return this.chartConstructor as typs.Constructor;
  }

  public setTitle(title: string) {
    this.options.title.text = title;
  }

  public setXAxisLabel(label: string) {
    this.options.xAxis.title = {
      ...this.options.xAxis.title,
      text: label
    };
  }

  public setYAxisLabel(yLabelAndIdPair: typs.SeriesIdPair) {
    this.getYAxisById(yLabelAndIdPair.id).map(yAxis => {
      return {
        ...yAxis,
        title: { ...yAxis.title, text: yLabelAndIdPair.title }
      };
    });
  }

  public setGridLines() {
    this.options.xAxis.gridLineWidth = 1;
  }

  public setSeriesType(seriesId: string, seriesLiteralType: string): boolean {
    // runtime type checking
    // make sure that the user can only change the series type to one of the
    // supported types for this type of graph ("Basic" | "3D" | ...)
    if (seriesLiteralType in this.seriesLiteralTypes) {
      this.getSeriesById(seriesId).map(series => {
        return {
          ...series,
          dataLabels: { enabled: true }
        };
      });
      return true;
    }
    return false;
  }

  public setSeriesDataLabels(seriesId: string) {
    this.getSeriesById(seriesId).map(series => {
      return {
        ...series,
        dataLabels: { enabled: true }
      };
    });
  }

  public setSeriesName(seriesId: string, name: string) {
    this.getSeriesById(seriesId).map(series => {
      return {
        ...series,
        name: name
      };
    });
  }

  public setSeriesColor(seriesId: string, color: string) {
    this.getSeriesById(seriesId).map(series => {
      return {
        ...series,
        color: color
      };
    });
  }

  private getYAxisById(seriesId: string) {
    return this.options.yAxis.filter(yAxis => yAxis.id === seriesId);
  }

  private getSeriesById(seriesId: string) {
    return this.options.series.filter(series => series.id === seriesId);
  }
}
