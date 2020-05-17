import GraphCreator from '../graph-creator';
import { getGraphConfigurationMock } from './mock-factory';
import { GraphConfiguration } from '../types';
import { DEFAULT_SUBTITLE_WITH_SOURCE } from '../constants';
import OptionsBuilder from '../options_builder';
import SeriesBuilder from '../series-builder';
import { colors } from '../default-graph-options';

/*
 * Test the Graph Creator functionality
 * The set of methods in this class are
 * responsible for assembling the complete
 * options object, which is required by
 * Highcharts to render a graph.
 */

describe('Graph Creator Methods', () => {
  const graphCreator = new GraphCreator();
  const title = 'title';
  const sourceURL = 'url';
  const seriesConfig = [
    { seriesType: 'pie', name: 'series1' },
    { seriesType: 'area', name: 'series2' },
    { seriesType: 'bar' }
  ];
  const mockStackData = ['stack1', 'stack2', 'stack3'];
  const mockXData = ['x1', 'x2', 'x3'];
  const mockYData = [
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3]
  ];
  const xConfig = { title: 'x-axis', valuePrefix: 'prefix' };
  const yConfig = {
    title: 'y-axis',
    valuePrefix: 'prefix',
    valueSuffix: 'suffix'
  };
  const stackConfig = { title: 'stack' };
  const mockGraphConfigWithAllProps: GraphConfiguration = {
    title: title,
    sourceUrl: sourceURL,
    xAxisData: mockXData,
    yAxisData: mockYData,
    seriesConfigs: seriesConfig,
    stackData: mockStackData,
    xConfig: xConfig,
    yConfig: yConfig,
    stackConfig: stackConfig
  };
  const mockGraphConfigWithRequiredProps = getGraphConfigurationMock();

  describe('createBasicGraph(): creates the graph options for a basic graph', () => {
    const graphWithAllProps = graphCreator.createBasicGraph(
      mockGraphConfigWithAllProps
    );
    const graphWithRequiredProps = graphCreator.createBasicGraph(
      mockGraphConfigWithRequiredProps
    );
    const graphOptionsWithAllProps = graphWithAllProps.graphOptions[0];
    const graphOptionsWithRequiredProps =
      graphWithRequiredProps.graphOptions[0];

    it('should return a list of graphs', () => {
      expect(graphWithAllProps.graphOptions.length).toEqual(1);
      expect(graphWithRequiredProps.graphOptions.length).toEqual(1);
    });
    it('should add a title', () => {
      expect(graphOptionsWithAllProps.title.text).toEqual(title);
    });
    it('should add a subtitle with the data source url', () => {
      expect(graphOptionsWithAllProps.subtitle.text).toEqual(
        DEFAULT_SUBTITLE_WITH_SOURCE + sourceURL
      );
    });
    it('should only add the x-axis title if given, it is not required', () => {
      expect(graphOptionsWithRequiredProps.xAxis.title?.text).toEqual('');
      expect(graphOptionsWithAllProps.xAxis.title?.text).toEqual('x-axis');
    });
    it('should only add the y-axis property if given, it is not required', () => {
      // The actual values may change over time, just make sure they are defined
      expect(graphOptionsWithRequiredProps.yAxis[0]).toBeDefined();
      expect(graphOptionsWithAllProps.yAxis[0].title?.text).toEqual('y-axis');
    });
    it('should only add the stack properties if given, it is not required', () => {
      expect(
        graphOptionsWithRequiredProps.plotOptions.series?.stacking
      ).toBeUndefined();
      expect(graphOptionsWithAllProps.plotOptions.series?.stacking).toEqual(
        'normal'
      );
      // The actual values may change over time, just make sure they are defined
      expect(graphOptionsWithAllProps.tooltip?.footerFormat).toBeDefined();
    });
    it('should create a series for each primary graph type', () => {
      expect(graphOptionsWithRequiredProps.series.length).toEqual(1);
    });
    it('should ignore secondary graph types if primary graph types are given', () => {
      expect(graphOptionsWithAllProps.series.length).toEqual(2);
    });
    it('should set the array of colors', () => {
      expect(graphOptionsWithAllProps.colors).toEqual(colors);
    });
  });

  describe('create3DGraph(): creates the graph options for a basic graph', () => {
    const graphWithAllProps = graphCreator.create3DGraph(
      mockGraphConfigWithAllProps
    );
    const graphWithRequiredProps = graphCreator.create3DGraph(
      mockGraphConfigWithRequiredProps
    );
    const graphOptionsWithAllProps = graphWithAllProps.graphOptions[0];
    const graphOptionsWithRequiredProps =
      graphWithRequiredProps.graphOptions[0];

    it('should return a list of graphs', () => {
      expect(graphWithAllProps.graphOptions.length).toEqual(1);
      expect(graphWithRequiredProps.graphOptions.length).toEqual(1);
    });
    it('should add a title', () => {
      expect(graphOptionsWithAllProps.title.text).toEqual(title);
    });
    it('should add a subtitle with the data source url', () => {
      expect(graphOptionsWithAllProps.subtitle.text).toEqual(
        DEFAULT_SUBTITLE_WITH_SOURCE + sourceURL
      );
    });
    it('should only add the x-axis title if given, it is not required', () => {
      expect(graphOptionsWithRequiredProps.xAxis.title?.text).toEqual('');
      expect(graphOptionsWithAllProps.xAxis.title?.text).toEqual('x-axis');
    });
    it('should only add the y-axis property if given, it is not required', () => {
      // The actual values may change over time, just make sure they are defined
      expect(graphOptionsWithRequiredProps.yAxis[0]).toBeDefined();
      expect(graphOptionsWithAllProps.yAxis[0].title?.text).toEqual('y-axis');
    });
    it('should only add the stack properties if given, it is not required', () => {
      expect(
        graphOptionsWithRequiredProps.plotOptions.series?.stacking
      ).toBeUndefined();
      expect(graphOptionsWithAllProps.plotOptions.series?.stacking).toEqual(
        'normal'
      );
      // The actual values may change over time, just make sure they are defined
      expect(graphOptionsWithAllProps.tooltip?.footerFormat).toBeDefined();
    });
    it('should add the 3D properties', () => {
      expect(graphOptionsWithAllProps.xAxis.labels?.skew3d).toBe(true);
      expect(graphOptionsWithAllProps.chart.options3d?.enabled).toBe(true);
      // The actual values may change over time, just make sure they are defined
      expect(graphOptionsWithAllProps.chart.options3d?.alpha).toBeDefined();
      expect(graphOptionsWithAllProps.chart.options3d?.beta).toBeDefined();
      expect(graphOptionsWithAllProps.chart.options3d?.depth).toBeDefined();
      expect(
        graphOptionsWithAllProps.chart.options3d?.viewDistance
      ).toBeDefined();
    });
    it('should create a series for each primary graph type', () => {
      expect(graphOptionsWithRequiredProps.series.length).toEqual(1);
    });
    it('should ignore secondary graph types if primary graph types are given', () => {
      expect(graphOptionsWithAllProps.series.length).toEqual(2);
    });
    it('should set the array of colors', () => {
      expect(graphOptionsWithAllProps.colors).toEqual(colors);
    });
  });

  describe('createCombinedGraph(): creates the graph options for a basic graph', () => {
    const graphWithAllProps = graphCreator.createCombinedGraph(
      mockGraphConfigWithAllProps
    );
    const graphWithRequiredProps = graphCreator.createCombinedGraph(
      mockGraphConfigWithRequiredProps
    );
    const graphOptionsWithAllProps = graphWithAllProps.graphOptions[0];
    const graphOptionsWithRequiredProps =
      graphWithRequiredProps.graphOptions[0];

    it('should return a list of graphs', () => {
      expect(graphWithAllProps.graphOptions.length).toEqual(1);
      expect(graphWithRequiredProps.graphOptions.length).toEqual(1);
    });
    it('should add a title', () => {
      expect(graphOptionsWithAllProps.title.text).toEqual(title);
    });
    it('should add a subtitle with the data source url', () => {
      expect(graphOptionsWithAllProps.subtitle.text).toEqual(
        DEFAULT_SUBTITLE_WITH_SOURCE + sourceURL
      );
    });
    it('should only add the x-axis title if given, it is not required', () => {
      expect(graphOptionsWithRequiredProps.xAxis.title?.text).toEqual('');
      expect(graphOptionsWithAllProps.xAxis.title?.text).toEqual('x-axis');
    });
    it('should only add the y-axis property if given, it is not required', () => {
      // The actual values may change over time, just make sure they are defined
      expect(graphOptionsWithRequiredProps.yAxis[0]).toBeDefined();
      expect(graphOptionsWithAllProps.yAxis[0].title?.text).toEqual('y-axis');
    });
    it('should only add the stack properties if given, it is not required', () => {
      expect(
        graphOptionsWithRequiredProps.plotOptions.series?.stacking
      ).toBeUndefined();
      expect(graphOptionsWithAllProps.plotOptions.series?.stacking).toEqual(
        'normal'
      );
      // The actual values may change over time, just make sure they are defined
      expect(graphOptionsWithAllProps.tooltip?.footerFormat).toBeDefined();
    });
    it('should add the properties for a combined graph', () => {
      expect(graphOptionsWithAllProps.plotOptions.pie?.dataLabels).toEqual({
        enabled: true
      });
      expect(graphOptionsWithAllProps.plotOptions.pie?.showInLegend).toBe(
        false
      );
      // The actual values may change over time, just make sure they are defined
      expect(graphOptionsWithAllProps.plotOptions.pie?.center).toBeDefined();
    });
    it('should create a series for both secondary and primary graph types', () => {
      expect(graphOptionsWithAllProps.series.length).toEqual(3);
      expect(graphOptionsWithRequiredProps.series.length).toEqual(1);
    });
    it('should set the array of colors', () => {
      expect(graphOptionsWithAllProps.colors).toEqual(colors);
    });
  });

  describe('createSynchronizedGraph(): creates the graph options for a basic graph', () => {
    const graphWithAllProps = graphCreator.createSynchronizedGraph(
      mockGraphConfigWithAllProps
    );
    const graphWithRequiredProps = graphCreator.createSynchronizedGraph(
      mockGraphConfigWithRequiredProps
    );
    const graphOptionsWithAllProps = graphWithAllProps.graphOptions[0];
    const graphOptionsWithRequiredProps =
      graphWithRequiredProps.graphOptions[0];

    it('should return a list of graphs', () => {
      expect(graphWithRequiredProps.graphOptions.length).toEqual(1);
    });
    it('should create a separate graph for each series and ignore secondary graph types', () => {
      expect(graphWithAllProps.graphOptions.length).toEqual(2);
    });
    it('should add a title', () => {
      expect(graphOptionsWithAllProps.title.text).toEqual(title);
    });
    it('should add a subtitle with the data source url', () => {
      expect(graphOptionsWithAllProps.subtitle.text).toEqual(
        DEFAULT_SUBTITLE_WITH_SOURCE + sourceURL
      );
    });
    it('should only add the x-axis title if given, it is not required', () => {
      expect(graphOptionsWithRequiredProps.xAxis.title?.text).toEqual('');
      expect(graphOptionsWithAllProps.xAxis.title?.text).toEqual('x-axis');
    });
    it('should only add the y-axis property if given, it is not required', () => {
      // The actual values may change over time, just make sure they are defined
      expect(graphOptionsWithRequiredProps.yAxis[0]).toBeDefined();
      expect(graphOptionsWithAllProps.yAxis[0].title?.text).toEqual('y-axis');
    });
    it('should not add any stack properties, it is not required', () => {
      expect(
        graphOptionsWithRequiredProps.plotOptions.series?.stacking
      ).toBeUndefined();
      expect(
        graphOptionsWithAllProps.plotOptions.series?.stacking
      ).toBeUndefined();
      // The actual values may change over time, just make sure they are defined
      expect(graphOptionsWithAllProps.tooltip?.footerFormat).toBeUndefined();
    });
    it('should create a series for each primary graph type', () => {
      expect(graphOptionsWithRequiredProps.series.length).toEqual(1);
    });
    it('should not create a graph for a secondary graph type', () => {
      const graphWithSecondaryGraphType = graphCreator.createSynchronizedGraph(
        getGraphConfigurationMock({
          seriesConfigs: [{ seriesType: 'pie' }]
        })
      );
      expect(graphWithSecondaryGraphType.graphOptions.length).toEqual(0);
    });
    it('should set the array of colors', () => {
      expect(graphOptionsWithAllProps.colors).toEqual(colors);
    });
  });
});
