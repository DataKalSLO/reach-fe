import { GRAPH_COMBINED_SIZE } from './constants';
import {
  DataConfiguration,
  GraphDataXValue,
  GraphDataYValue,
  PrimarySeries,
  PrimarySeriesTypes,
  SecondarySeries,
  SecondarySeriesTypes,
  SeriesConfiguration,
  SeriesListBasic,
  SeriesListCombined,
  SeriesListSynchronized
} from './types';
import {
  isPrimarySeriesType,
  isSecondarySeriesType,
  zipData
} from './utilities';

/*
 * This class is responsible for creating the graph
 * series list (the Highcharts "series" property) required
 * to render data on a graph. For every set of data, a
 * series (either Primary or Secondary) is created and added
 * to the appropriate list, which can then be extracted.
 * - refer to ./types.ts for more information about
 *   Secondary vs Primary
 * - for more information about the series property
 *   see https://api.highcharts.com/highcharts/series
 */

export default class SeriesBuilder {
  private primarySeries!: PrimarySeries[];
  private secondarySeries!: SecondarySeries[];
  private graphXData!: GraphDataXValue[];
  private graphYData!: GraphDataYValue[][];
  private graphStackData!: GraphDataXValue[];

  constructor() {
    this.resetSeries();
  }

  private resetSeries() {
    this.primarySeries = [];
    this.secondarySeries = [];
    this.graphXData = [];
    this.graphYData = [];
    this.graphStackData = [];
  }

  /*
   * Set the data given for a graph
   */
  public withData(dataConfig: DataConfiguration) {
    this.graphXData = dataConfig.xAxisData;
    this.graphYData = dataConfig.yAxisData;
    this.graphStackData = dataConfig.stackData;
    return this;
  }

  /*
   * Create a series for each SeriesConfiguration, which each
   * correspond to one set of data. These series are built
   * for graphs that can contain either a primary or secondary
   * series but not both.
   */
  public withBasicSeries(seriesConfigs: SeriesConfiguration[]) {
    seriesConfigs.forEach((seriesConfig, index) => {
      const { seriesType, ...otherSeriesInfo } = seriesConfig;
      // need to type cast seriesType to pass as argument
      if (isPrimarySeriesType(seriesType)) {
        this.primarySeries.push(
          this.createSeriesForPrimaryType(seriesType, otherSeriesInfo, index)
        );
      } else if (isSecondarySeriesType(seriesType)) {
        this.secondarySeries.push(
          this.createSeriesForSecondaryType(seriesType, otherSeriesInfo, index)
        );
      }
    });
    return this;
  }

  /*
   * Create a series for each SeriesConfiguration, which each
   * correspond to one set of data. These series are built
   * for graphs that can contain both a primary and a secondary series.
   * Therefore, extra options have to be passed to the secondary series
   * in order for them to be rendered on the same graph.
   */
  public withCombinedSeries(seriesConfigs: SeriesConfiguration[]) {
    seriesConfigs.forEach((seriesConfig, index) => {
      const { seriesType, ...otherSeriesInfo } = seriesConfig;
      // need to type cast seriesType to pass as argument
      if (isPrimarySeriesType(seriesType)) {
        this.primarySeries.push(
          this.createSeriesForPrimaryType(seriesType, otherSeriesInfo, index)
        );
      } else if (isSecondarySeriesType(seriesType)) {
        const extraSeriesOptions = { size: GRAPH_COMBINED_SIZE };
        this.secondarySeries.push(
          this.createSeriesForSecondaryType(
            seriesType,
            otherSeriesInfo,
            index,
            extraSeriesOptions
          )
        );
      }
    });
    return this;
  }

  /*
   * Get the generated series for a Basic Graph.
   * Basic Graph: Multiple Primary Series or 1 Secondary Series
   */
  public getBasicSeries(): SeriesListBasic {
    let finishedSeries: SeriesListBasic;
    /*
     * Only get a secondary series if only one is built and no
     * primary series were created.
     */
    if (this.secondarySeries.length === 1 && this.primarySeries.length === 0) {
      finishedSeries = [this.secondarySeries[0]];
    } else {
      finishedSeries = [...this.primarySeries];
    }
    this.resetSeries();
    return finishedSeries;
  }

  /*
   * Get the generated series for a Combined Graph
   * Combined Graph: Multiple Primary Series & 1 Secondary Series
   */
  public getCombinedSeries(): SeriesListCombined {
    const finishedSeries: SeriesListCombined = [...this.primarySeries];
    if (this.secondarySeries.length > 0) {
      // combined graphs can only contain one secondary series
      finishedSeries.push(this.secondarySeries[0]);
    }
    this.resetSeries();
    return finishedSeries;
  }

  /*
   * Get the generated series for a Synchronized Graph
   * Synchronized Graph: Multiple Primary Series
   */
  public getSynchronizedSeries(): SeriesListSynchronized {
    // synchronized graphs can only contain one primary series
    const finishedSeries: SeriesListSynchronized = [this.primarySeries[0]];
    this.resetSeries();
    return finishedSeries;
  }

  private createSeriesForPrimaryType(
    seriesType: PrimarySeriesTypes,
    partialSeriesConfig: Omit<SeriesConfiguration, 'seriesType'>,
    index: number
  ): PrimarySeries {
    return {
      type: seriesType,
      name: partialSeriesConfig.name, // Highcharts adds default value if undefined
      color: partialSeriesConfig.color, // Highcharts adds default value if undefined
      data: zipData(this.graphXData, this.graphYData[index]),
      stack: this.graphStackData[index]
    };
  }

  private createSeriesForSecondaryType(
    seriesType: SecondarySeriesTypes,
    partialSeriesConfig: Omit<SeriesConfiguration, 'seriesType'>,
    index: number,
    extraSeriesOptions?: Partial<SecondarySeries>
  ): SecondarySeries {
    return {
      type: seriesType,
      name: partialSeriesConfig.name, // Highcharts adds default value if undefined
      data: zipData(this.graphXData, this.graphYData[index]),
      ...extraSeriesOptions
    };
  }
}
