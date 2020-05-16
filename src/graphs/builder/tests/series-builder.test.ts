import SeriesBuilder from '../series-builder';
import { getSeriesConfigurationMock } from './mock-factory';
import { SeriesPieOptions } from 'highcharts';

/*
 * Test the Series Builder functionality.
 * The set of methods in this class are resopnsible
 * for generating the series list for the series
 * property of the options object, which is required by Highcharts.
 */

const seriesBuilder = new SeriesBuilder();
const mockStackData = ['graph1', 'graph2', 'graph3'];
const mockXData = ['1', '2', '3'];
const mockYData = [
  [1, 1, 1],
  [2, 2, 2],
  [3, 3, 3]
];

describe('withBasicSeries(): create a basic graph series', () => {
  // build series
  const mockPrimarySeriesConfigs = [
    getSeriesConfigurationMock({
      seriesType: 'pie',
      name: 'pie',
      color: 'blue'
    }),
    getSeriesConfigurationMock({
      seriesType: 'line',
      name: 'line',
      color: 'blue'
    }),
    getSeriesConfigurationMock({ seriesType: 'bar', name: 'bar' })
  ];
  seriesBuilder.withData({
    seriesLength: 3,
    xAxisType: 'category',
    xAxisData: mockXData,
    yAxisData: mockYData,
    stackData: mockStackData
  });
  seriesBuilder.withBasicSeries(mockPrimarySeriesConfigs);
  const series1 = seriesBuilder.getBasicSeries();

  // build series
  seriesBuilder.withData({
    seriesLength: 1,
    xAxisType: 'category',
    xAxisData: mockXData,
    yAxisData: [mockYData[0]], // only get one set for one series
    stackData: mockStackData
  });
  const mockSecondarySeriesConfigs = [
    getSeriesConfigurationMock({ seriesType: 'pie', name: undefined })
  ];
  seriesBuilder.withBasicSeries(mockSecondarySeriesConfigs);
  const series2 = seriesBuilder.getBasicSeries();

  it('should only add a series for a secondary typed graph if a primary typed graph is not given', () => {
    expect(series1.length).toEqual(2);
    expect(series1[0].type).toEqual('line');
    expect(series2.length).toEqual(1);
    expect(series2[0].type).toEqual('pie');
  });
  it('should keep the name undefined if given an undefined value', () => {
    expect(series1[0].name).toEqual('line');
    expect(series2[0].name).toEqual(undefined);
  });
  it('should keep the color undefined if given an undefined value', () => {
    expect(series1[0].color).toEqual('blue');
    expect(series2[0].color).toEqual(undefined);
  });
  it('should not add stack for secondary graph types', () => {
    expect(series2[0].stack).toBeUndefined();
  });
  it('should zip the x-axis and y-axis data', () => {
    expect(
      (series1[0].data = [
        ['1', 1],
        ['2', 2],
        ['3', 3]
      ])
    );
  });
});

describe('withCombinedSeriesOfType(): create a basic graph series', () => {
  // build series
  const mockPrimarySeriesConfigs = [
    getSeriesConfigurationMock({ seriesType: 'pie', name: undefined }),
    getSeriesConfigurationMock({ seriesType: 'line', name: 'line' }),
    getSeriesConfigurationMock({ seriesType: 'pie', name: 'pie' })
  ];
  seriesBuilder.withData({
    seriesLength: 3,
    xAxisType: 'category',
    xAxisData: mockXData,
    yAxisData: mockYData,
    stackData: mockStackData
  });
  seriesBuilder.withCombinedSeries(mockPrimarySeriesConfigs);
  const series1 = seriesBuilder.getCombinedSeries();

  // build series
  seriesBuilder.withData({
    seriesLength: 1,
    xAxisType: 'category',
    xAxisData: mockXData,
    yAxisData: [mockYData[0]], // only get one set for one series
    stackData: mockStackData
  });
  const mockSecondarySeriesConfigs = [
    getSeriesConfigurationMock({
      seriesType: 'line',
      name: 'line',
      color: 'red'
    })
  ];
  seriesBuilder.withCombinedSeries(mockSecondarySeriesConfigs);
  const series2 = seriesBuilder.getCombinedSeries();

  it('should add the primary graph types first then the secondary', () => {
    expect(series1[0].type).toEqual('line');
    expect(series1[1].type).toEqual('pie');
  });
  it('should only add one secondary graph type if multiple are given', () => {
    expect(series1.length).toEqual(2);
    expect(series1[0].type).toEqual('line');
    expect(series1[1].type).toEqual('pie');
    expect(series2.length).toEqual(1);
    expect(series2[0].type).toEqual('line');
  });
  it('should add set the center property of the secondary graph type', () => {
    // need to cast to access added property
    const seriesOptions = series1[1] as SeriesPieOptions;
    expect(seriesOptions.size).toBeDefined();
  });
  it('should keep the name undefined if given an undefined value', () => {
    expect(series1[0].name).toEqual('line');
    expect(series1[1].name).toEqual(undefined);
  });
  it('should keep the color undefined if given an undefined value', () => {
    expect(series1[0].color).toEqual(undefined);
    expect(series2[0].color).toEqual('red');
  });
  it('should add the stack value to each series', () => {
    expect(series1[0].stack).toEqual('graph2');
    expect(series1[1].stack).toBeUndefined();
  });
  it('should zip the x-axis and y-axis data', () => {
    expect(
      (series1[0].data = [
        ['1', 1],
        ['2', 2],
        ['3', 3]
      ])
    );
  });
});

describe('getSynchronizedSeries(): create a basic graph series', () => {
  // build series
  const mockPrimarySeriesConfigs = [
    getSeriesConfigurationMock({ seriesType: 'pie', name: undefined }),
    getSeriesConfigurationMock({ seriesType: 'line', name: 'line' }),
    getSeriesConfigurationMock({ seriesType: 'pie', name: 'pie' })
  ];
  seriesBuilder.withData({
    seriesLength: 3,
    xAxisType: 'category',
    xAxisData: mockXData,
    yAxisData: mockYData,
    stackData: mockStackData
  });
  seriesBuilder.withBasicSeries(mockPrimarySeriesConfigs);
  const series1 = seriesBuilder.getSynchronizedSeries();

  it('should only create one series', () => {
    expect(series1.length).toEqual(1);
  });
  it('should return the first primary typed series if multiple are given', () => {
    expect(series1[0].name).toEqual('line');
    expect(series1[0].type).toEqual('line');
  });
  it('should add stack for primary graph types', () => {
    expect(series1[0].stack).toEqual('graph2');
  });
});
