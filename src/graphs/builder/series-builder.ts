import * as cnst from './constants';
import * as typs from './types';

/*
 * This class is responsible for creating the graph
 * series list (the Highcharts "series" property) required
 * to render data on a graph. Each method will create
 * the series for a specific type of graph.
 */

export default class SeriesBuilder {
  /*
   * Takes a list of SeriesConfiguration, defining the configuration
   * for each series and returns the corresponding list of series
   */
  public createBasicGraphSeries(
    seriesConfigs: typs.SeriesConfiguration[]
  ): typs.SeriesListBasic {
    const seriesList: typs.SeriesListBasic = [];
    seriesConfigs.forEach((seriesConfig: typs.SeriesConfiguration) => {
      const seriesType = seriesConfig.seriesType as typs.GraphBasicTypes;
      const series: typs.SeriesBasic = {
        type: seriesType,
        stack: seriesConfig.stack,
        data: seriesConfig.data
      };
      seriesList.push(series);
    });
    return seriesList;
  }

  /*
   * Only one SeriesConfiguration is given since one only pie graph may
   * be rendered on a chart, except for "Combination" graphs. Pie series
   * for these graphs are simply treated as another type.
   */
  public createPieGraphSeries(
    seriesConfig: typs.SeriesConfiguration
  ): typs.SeriesListPie {
    const seriesType = seriesConfig.seriesType as typs.GraphPieTypes;
    const series: typs.SeriesPie = {
      type: seriesType,
      data: seriesConfig.data
    };
    const seriesList: typs.SeriesListPie = [series];
    return seriesList;
  }

  /*
   * Takes a list of SeriesConfiguration, defining the configuration
   * for each series and returns the corresponding list of series
   */
  public createCombinedGraphSeries(
    seriesConfigs: typs.SeriesConfiguration[]
  ): typs.SeriesListCombined {
    const seriesList: typs.SeriesListCombined = [];
    seriesConfigs.forEach((seriesConfig: typs.SeriesConfiguration) => {
      // need to check if the configuration belongs to a pie chart
      if (seriesConfig.seriesType in typs.graphPieTypesEnum) {
        const seriesType = seriesConfig.seriesType as typs.GraphPieTypes;
        const series: typs.SeriesPie = {
          data: seriesConfig.data,
          type: seriesType,
          center: [cnst.COMBINED_CHART_CENTER_X, cnst.COMBINED_CHART_CENTER_Y],
          size: cnst.COMBINED_CHART_SIZE,
          showInLegend: false,
          dataLabels: { enabled: false }
        };
        seriesList.push(series);
      } else {
        const seriesType = seriesConfig.seriesType as typs.GraphBasicTypes;
        const series: typs.SeriesBasic = {
          type: seriesType,
          stack: seriesConfig.stack,
          data: seriesConfig.data
        };
        seriesList.push(series);
      }
    });
    return seriesList;
  }

  /*
   * Takes a list of SeriesConfiguration, defining the configuration
   * for each series and returns the corresponding list of series
   */
  public create3DGraphSeries(
    seriesConfigs: typs.SeriesConfiguration[]
  ): typs.SeriesList3D {
    const seriesList: typs.SeriesList3D = [];
    seriesConfigs.forEach((seriesConfig: typs.SeriesConfiguration) => {
      const seriesType = seriesConfig.seriesType as typs.Graph3DTypes;
      const series: typs.Series3D = {
        type: seriesType,
        stack: seriesConfig.stack,
        data: seriesConfig.data
      };
      seriesList.push(series);
    });
    return seriesList;
  }

  /*
   * Only one SeriesConfiguration is given since "Synchronized",
   * graphs are merely a collection of "Basic" graphs.
   */
  public createSynchronizedGraphSeries(
    seriesConfig: typs.SeriesConfiguration
  ): typs.SeriesListSynchronized {
    const seriesType = seriesConfig.seriesType as typs.GraphBasicTypes;
    const series: typs.SeriesBasic = {
      type: seriesType,
      stack: seriesConfig.stack,
      data: seriesConfig.data
    };
    const seriesList: typs.SeriesListSynchronized = [series];
    return seriesList;
  }
}
