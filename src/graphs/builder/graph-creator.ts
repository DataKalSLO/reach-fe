import SeriesBuilder from './series-builder';
import OptionsBuilder from './options_builder';
import Graph from './graph';
import * as cnst from './constants';
import * as typs from './types';

/*
 * This class is responsible for creating a Graph.
 * It uses the options builder and the series builder
 * to build the final options objecte, which is required
 * by Highcharts to render a chart. Each creation method
 * returns a list of graphs (simply facilitates outside access).
 */

export default class GraphCreator {
  seriesBuilder: SeriesBuilder;
  optionsBuilder: OptionsBuilder;
  chartConstructor: string;

  constructor() {
    this.seriesBuilder = new SeriesBuilder();
    this.optionsBuilder = new OptionsBuilder();
    this.chartConstructor = cnst.CHART_CONSTRUCTOR;
  }

  public createBasicGraph(config: typs.GraphConfiguration): Graph[] {
    this.createGeneralOptions(config);
    let series: typs.SeriesListBasic | typs.SeriesListPie = [];
    // only one pie series can be rendered for a "Basic" graph
    if (this.isPie(config.seriesConfigs)) {
      series = this.seriesBuilder.createPieGraphSeries(config.seriesConfigs[0]);
    } else {
      series = this.seriesBuilder.createBasicGraphSeries(config.seriesConfigs);
    }
    // create the options
    const options: typs.GraphOptionsBasic = {
      ...this.optionsBuilder.getOptions(),
      series: series
    };
    // get the supported series types (required for runtime type checking)
    const graphTypesEnum = {
      ...typs.graphBasicTypesEnum,
      ...typs.graphPieTypesEnum
    };
    return [new Graph(options, graphTypesEnum, this.chartConstructor)];
  }

  public createCombinedGraph(config: typs.GraphConfiguration): Graph[] {
    this.createGeneralOptions(config);
    const series: typs.SeriesListCombined = this.seriesBuilder.createCombinedGraphSeries(
      config.seriesConfigs
    );
    // create the options
    const options: typs.GraphOptionsCombined = {
      ...this.optionsBuilder.getOptions(),
      series: series
    };
    return [
      new Graph(options, typs.graphCombinedTypesEnum, this.chartConstructor)
    ];
  }

  public create3DGraph(config: typs.GraphConfiguration): Graph[] {
    this.createGeneralOptions(config);
    this.optionsBuilder.with3DOptions();
    let series: typs.SeriesList3D | typs.SeriesListPie = [];
    // only one pie series can be rendered for a "Basic" graph
    if (this.isPie(config.seriesConfigs)) {
      series = this.seriesBuilder.createPieGraphSeries(config.seriesConfigs[0]);
    } else {
      series = this.seriesBuilder.create3DGraphSeries(config.seriesConfigs);
    }
    // create the options
    const options: typs.GraphOptions3D = {
      ...this.optionsBuilder.getOptions(),
      series: series
    };
    // get the supported series types (required for runtime type checking)
    const graphTypesEnum = {
      ...typs.graph3DTypesEnum,
      ...typs.graphPieTypesEnum
    };
    return [new Graph(options, graphTypesEnum, this.chartConstructor)];
  }

  /**
   * Synchronized graphs are merely a collection of "Basic" graphs.
   * Therefore this needs to return a list of graphs. This is the
   * reason why the other methods return a list; facilitates access
   * as every creation method can be expected to return a list of graphs.
   */
  public createSynchronizedGraph(config: typs.GraphConfiguration) {
    const graphs: Graph[] = [];
    config.seriesConfigs.forEach(seriesConfig => {
      this.createXAxisWith(config.xAxis.title, config.xAxis.axisType);
      this.createYAxisWith([seriesConfig]);
      this.optionsBuilder.withSynchronizedOptions();
      const series = this.seriesBuilder.createSynchronizedGraphSeries(
        seriesConfig
      );
      // create the options
      const options: typs.GraphOptionsBasic = {
        ...this.optionsBuilder.getOptions(),
        series: series
      };
      graphs.push(
        new Graph(options, typs.graphBasicTypesEnum, this.chartConstructor)
      );
    });
    return graphs;
  }

  // build the general options that apply to every chart
  private createGeneralOptions(config: typs.GraphConfiguration) {
    this.optionsBuilder.withTitle(config.graph.title);
    this.createXAxisWith(config.xAxis.title, config.xAxis.axisType);
    this.createYAxisWith(config.seriesConfigs);
  }

  /**
   * Infers the type of chart (chart constructor) based on the
   * type of values used for the x-axis. Datetime values will
   * use highstocks to render the graph, while categorical values
   * will use highcharts to render the graph.
   */
  private createXAxisWith(title: string, axisType: string): void {
    if (axisType === cnst.X_AXIS_TIMESERIES_TYPE) {
      this.optionsBuilder.withTimeSeries();
      this.chartConstructor = cnst.STOCK_CONSTRUCTOR;
    } else {
      this.optionsBuilder.withCategories();
      this.chartConstructor = cnst.CHART_CONSTRUCTOR;
    }
    this.optionsBuilder.withXAxisTitle(title);
  }

  private createYAxisWith(seriesConfigs: typs.SeriesConfiguration[]): void {
    let yAxisIsSet = false;
    seriesConfigs.forEach(series => {
      // create another y-axis, but only allow one to be created, for a
      // total of two y-axes per graph.
      if (series.isMultiAxis || !yAxisIsSet) {
        this.optionsBuilder.withYAxis(
          series.yAxisTitle,
          series.seriesId,
          series.isMultiAxis
        );
        yAxisIsSet = true;
      }
    });
  }

  private isPie(seriesConfigs: typs.SeriesConfiguration[]): boolean {
    // verify that only one pie series is given
    if (
      seriesConfigs.length === 1 &&
      seriesConfigs[0].seriesType in typs.graphPieTypesEnum
    ) {
      return true;
    }
    return false;
  }
}
