import SeriesBuilder from './series-builder';
import OptionsBuilder from './options_builder';
import { isUndefined } from 'util';
import * as types from './types';
import {
  getXAxisDataType,
  convertXData,
  convertYData,
  convertStackData
} from './utilities';

/*
 * This class is responsible for creating a Graph.
 * It uses the options builder and the series builder
 * to build the final options object, which is required
 * by Highcharts to render a chart. One creation method
 * is made for each graph type since different graph types
 * can contain a different set of options. Each creation
 * method returns a Graph object containing the options
 * object, the x-axis data type, and the supported series
 * types for that graph type.
 * - refer to the Graph interface in ./types.ts
 *   for more information about the return type
 */

export default class GraphCreator {
  seriesBuilder: SeriesBuilder;
  optionsBuilder: OptionsBuilder;

  constructor() {
    this.seriesBuilder = new SeriesBuilder();
    this.optionsBuilder = new OptionsBuilder();
  }

  public createBasicGraph(config: types.GraphConfiguration): types.Graph {
    const dataConfig = this.getDataConfiguration(config);
    this.createGeneralOptions(config, dataConfig);
    this.createStackingOptions(config);
    this.seriesBuilder.withData(dataConfig);
    this.seriesBuilder.withBasicSeries(config.seriesConfigs);
    const options: types.GraphOptionsBasic = {
      ...this.optionsBuilder.getOptions(),
      series: this.seriesBuilder.getBasicSeries()
    };
    return {
      graphOptions: [options],
      xAxisDataType: dataConfig.xAxisType
    };
  }

  public create3DGraph(config: types.GraphConfiguration): types.Graph {
    const dataConfig = this.getDataConfiguration(config);
    this.createGeneralOptions(config, dataConfig);
    this.createStackingOptions(config);
    this.optionsBuilder.with3DOptions();
    this.seriesBuilder.withData(dataConfig);
    this.seriesBuilder.withBasicSeries(config.seriesConfigs);
    const options: types.GraphOptionsBasic = {
      ...this.optionsBuilder.getOptions(),
      series: this.seriesBuilder.getBasicSeries()
    };
    return {
      graphOptions: [options],
      xAxisDataType: dataConfig.xAxisType
    };
  }

  public createCombinedGraph(config: types.GraphConfiguration): types.Graph {
    const dataConfig = this.getDataConfiguration(config);
    this.createGeneralOptions(config, dataConfig);
    this.createStackingOptions(config);
    this.optionsBuilder.withCombinedOptions();
    this.seriesBuilder.withData(dataConfig);
    this.seriesBuilder.withCombinedSeries(config.seriesConfigs);
    const options: types.GraphOptionsCombined = {
      ...this.optionsBuilder.getOptions(),
      series: this.seriesBuilder.getCombinedSeries()
    };
    return {
      graphOptions: [options],
      xAxisDataType: dataConfig.xAxisType
    };
  }

  /*
   * Synchronized graphs are merely a collection of "Basic" graphs.
   * Therefore this needs to return a list of graphsOptions. This is
   * the reason why graphOptions is a list; facilitates access
   * as every creation method can be expected to return a list of
   * graph options.
   */
  public createSynchronizedGraph(
    config: types.GraphConfiguration
  ): types.Graph {
    const graphOptions: types.GraphOptionsType[] = [];
    const dataConfig = this.getDataConfiguration(config);
    // create a graph for every series
    config.seriesConfigs.forEach((seriesConfig, index) => {
      // each series contains one set of y-axis data
      const dataConfigForOneSeries = {
        ...dataConfig,
        // get y-axis data for one series
        yAxisData: [dataConfig.yAxisData[index]]
      };
      this.createGeneralOptions(config, dataConfigForOneSeries);
      this.optionsBuilder.withSynchronizedOptions();
      this.seriesBuilder.withData(dataConfigForOneSeries);
      this.seriesBuilder.withBasicSeries([seriesConfig]);
      const options: types.GraphOptionsSynchronized = {
        ...this.optionsBuilder.getOptions(),
        series: this.seriesBuilder.getSynchronizedSeries()
      };
      /*
       * This an be undefined if the series is a secondary typed series.
       * A synchronized graph cannot contain a secondary series type.
       */
      if (!isUndefined(options.series[0])) {
        graphOptions.push(options);
      }
    });
    return {
      graphOptions: graphOptions,
      xAxisDataType: dataConfig.xAxisType
    };
  }

  /*
   * Build the general options that apply to every chart
   */
  private createGeneralOptions(
    config: types.GraphConfiguration,
    dataConfig: types.DataConfiguration
  ) {
    this.optionsBuilder.withGraphTitle(config.title);
    if (!isUndefined(config.sourceUrl))
      this.optionsBuilder.withGraphSourceURL(config.sourceUrl);
    if (!isUndefined(config.yConfig))
      this.optionsBuilder.withYAxis(config.yConfig);
    if (!isUndefined(config.xConfig)) {
      this.optionsBuilder.withXAxisDataType(dataConfig);
      this.optionsBuilder.withXAxis(config.xConfig);
    }
  }

  /*
   * Enable stacking if stacking data is given
   */
  private createStackingOptions(config: types.GraphConfiguration) {
    if (!isUndefined(config.stackData)) {
      this.optionsBuilder.withStack(config.stackData);
    }
    if (!isUndefined(config.stackConfig))
      this.optionsBuilder.withStackOptions(config.stackConfig);
  }

  /*
   * This function has 2 responsibilities
   *  1. Get the x-axis data type
   *  2. Convert all the data to the appropriate types.
   * These responsibilities were merged into one function
   * since converting the data relies on the x-axis data type.
   */
  private getDataConfiguration(
    config: types.GraphConfiguration
  ): types.DataConfiguration {
    const seriesLength = config.seriesConfigs.length;
    const xAxisDataType = getXAxisDataType(config.xAxisData);
    const convertedXAxisData = convertXData(xAxisDataType, config.xAxisData);
    const convertedYAxisData = convertYData(config.yAxisData);
    const convertedStackData = convertStackData(seriesLength, config.stackData);
    return {
      seriesLength: seriesLength,
      xAxisType: xAxisDataType,
      xAxisData: convertedXAxisData,
      yAxisData: convertedYAxisData,
      stackData: convertedStackData
    };
  }
}
