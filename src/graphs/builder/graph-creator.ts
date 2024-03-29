import { isUndefined } from 'util';
import OptionsBuilder from './options_builder';
import SeriesBuilder from './series-builder';
import {
  DataConfiguration,
  Graph,
  GraphConfiguration,
  GraphOptionsBasic,
  GraphOptionsCombined,
  GraphOptionsSynchronized,
  GraphOptionsType
} from './types';
import {
  convertStackData,
  convertYData,
  getXAxisTypeAndConvertedData
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
 * for that graph type.
 * - refer to the Graph interface in types.ts
 *   for more information about the return type
 */

export default class GraphCreator {
  seriesBuilder: SeriesBuilder;
  optionsBuilder: OptionsBuilder;

  constructor() {
    this.seriesBuilder = new SeriesBuilder();
    this.optionsBuilder = new OptionsBuilder();
  }

  public createBasicGraph(config: GraphConfiguration): Graph {
    const dataConfig = this.getDataConfiguration(config);
    const options: GraphOptionsBasic = {
      ...this.withGeneralOptions(config, dataConfig)
        .withStack(config.stackData)
        .withStackOptions(config.stackConfig)
        .getOptions(),
      series: this.seriesBuilder
        .withData(dataConfig)
        .withBasicSeries(config.seriesConfigs)
        .getBasicSeries()
    };
    return {
      graphOptions: [options],
      xAxisDataType: dataConfig.xAxisType
    };
  }

  public create3DGraph(config: GraphConfiguration): Graph {
    const dataConfig = this.getDataConfiguration(config);
    const options: GraphOptionsBasic = {
      ...this.withGeneralOptions(config, dataConfig)
        .withStack(config.stackData)
        .withStackOptions(config.stackConfig)
        .with3DOptions()
        .getOptions(),
      series: this.seriesBuilder
        .withData(dataConfig)
        .withBasicSeries(config.seriesConfigs)
        .getBasicSeries()
    };
    return {
      graphOptions: [options],
      xAxisDataType: dataConfig.xAxisType
    };
  }

  public createCombinedGraph(config: GraphConfiguration): Graph {
    const dataConfig = this.getDataConfiguration(config);
    const options: GraphOptionsCombined = {
      ...this.withGeneralOptions(config, dataConfig)
        .withStack(config.stackData)
        .withStackOptions(config.stackConfig)
        .withCombinedOptions()
        .getOptions(),
      series: this.seriesBuilder
        .withData(dataConfig)
        .withCombinedSeries(config.seriesConfigs)
        .getCombinedSeries()
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
  public createSynchronizedGraph(config: GraphConfiguration): Graph {
    const graphOptions: GraphOptionsType[] = [];
    const dataConfig = this.getDataConfiguration(config);
    // create a graph for every series
    config.seriesConfigs.forEach((seriesConfig, index) => {
      // each series contains one set of y-axis data
      const dataConfigForOneSeries = {
        ...dataConfig,
        // get y-axis data for one series
        yAxisData: [dataConfig.yAxisData[index]]
      };
      const options: GraphOptionsSynchronized = {
        ...this.withGeneralOptions(config, dataConfigForOneSeries)
          .withSynchronizedOptions()
          .getOptions(),
        series: this.seriesBuilder
          .withData(dataConfigForOneSeries)
          .withBasicSeries([seriesConfig])
          .getSynchronizedSeries()
      };
      /*
       * This can be undefined if the series is a secondary typed series.
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
  private withGeneralOptions(
    config: GraphConfiguration,
    dataConfig: DataConfiguration
  ) {
    this.optionsBuilder
      .withGraphTitle(config.title)
      .withGraphSubtitle(config.subtitle)
      .withYAxis(config.yConfig)
      .withXAxisDataType(dataConfig)
      .withXAxis(config.xConfig);
    return this.optionsBuilder;
  }

  /*
   * This function has 2 responsibilities
   *  1. Get the x-axis data type
   *  2. Convert all the data to the appropriate types
   * These responsibilities were merged into one function
   * since converting the data relies on the x-axis data type.
   */
  private getDataConfiguration(config: GraphConfiguration): DataConfiguration {
    const seriesLength = config.seriesConfigs.length;
    const xAxisDataConfig = getXAxisTypeAndConvertedData(config.xAxisData);
    return {
      seriesLength: seriesLength,
      xAxisType: xAxisDataConfig.xAxisType,
      xAxisData: xAxisDataConfig.xAxisData,
      yAxisData: convertYData(config.yAxisData),
      stackData: convertStackData(seriesLength, config.stackData)
    };
  }
}
