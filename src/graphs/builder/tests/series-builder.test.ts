import SeriesBuilder from '../series-builder';
import { getSeriesConfigurationMock } from './mock-factory';
import { SeriesPieOptions } from 'highcharts';

/*
 * Test the Series Builder functionality.
 * The set of methods in this class are responsible
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

describe('Create a basic graph series', () => {
  // build basic primary series
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
  const primarySeries = seriesBuilder
    .withData({
      seriesLength: 3,
      xAxisType: 'category',
      xAxisData: mockXData,
      yAxisData: mockYData,
      stackData: mockStackData
    })
    .withBasicSeries(mockPrimarySeriesConfigs)
    .getBasicSeries();

  // build basic secondary series
  const mockSecondarySeriesConfigs = [
    getSeriesConfigurationMock({ seriesType: 'pie', name: undefined })
  ];
  const secondarySeries = seriesBuilder
    .withData({
      seriesLength: 1,
      xAxisType: 'category',
      xAxisData: mockXData,
      yAxisData: [mockYData[0]], // only get one set for one series
      stackData: mockStackData
    })
    .withBasicSeries(mockSecondarySeriesConfigs)
    .getBasicSeries();

  it('should only add a secondary series if a primary series is not given', () => {
    expect(primarySeries.length).toEqual(2);
    expect(primarySeries[0].type).toEqual('line');
    expect(secondarySeries.length).toEqual(1);
    expect(secondarySeries[0].type).toEqual('pie');
  });
  it('should keep the name undefined if given an undefined value', () => {
    expect(primarySeries[0].name).toEqual('line');
    expect(secondarySeries[0].name).toEqual(undefined);
  });
  it('should keep the color undefined if given an undefined value', () => {
    expect(primarySeries[0].color).toEqual('blue');
    expect(secondarySeries[0].color).toEqual(undefined);
  });
  it('should not add stack for secondary series types', () => {
    expect(secondarySeries[0].stack).toBeUndefined();
  });
  it('should zip the x-axis and y-axis data', () => {
    expect(
      (primarySeries[0].data = [
        ['1', 1],
        ['2', 2],
        ['3', 3]
      ])
    );
  });
});

describe('Create a combined graph series', () => {
  // build combined primary series with secondary series
  const mockMixedSeriesConfigs = [
    getSeriesConfigurationMock({ seriesType: 'pie', name: undefined }),
    getSeriesConfigurationMock({ seriesType: 'line', name: 'line' }),
    getSeriesConfigurationMock({ seriesType: 'pie', name: 'pie' })
  ];
  const combinedSeries = seriesBuilder
    .withData({
      seriesLength: 3,
      xAxisType: 'category',
      xAxisData: mockXData,
      yAxisData: mockYData,
      stackData: mockStackData
    })
    .withCombinedSeries(mockMixedSeriesConfigs)
    .getCombinedSeries();

  // build combined primary series
  const mockPrimarySeriesConfigs = [
    getSeriesConfigurationMock({
      seriesType: 'line',
      name: 'line',
      color: 'red'
    })
  ];

  const combinedSeriesWithoutSecondary = seriesBuilder
    .withData({
      seriesLength: 1,
      xAxisType: 'category',
      xAxisData: mockXData,
      yAxisData: [mockYData[0]], // only get one set for one series
      stackData: mockStackData
    })
    .withCombinedSeries(mockPrimarySeriesConfigs)
    .getCombinedSeries();

  it('should add the primary series types first then the secondary types', () => {
    expect(combinedSeries[0].type).toEqual('line');
    expect(combinedSeries[1].type).toEqual('pie');
  });
  it('should only add one secondary series type if multiple are given', () => {
    expect(combinedSeries.length).toEqual(2);
    expect(combinedSeries[0].type).toEqual('line');
    expect(combinedSeries[1].type).toEqual('pie');
  });
  it('should not add a secondary graph type if not given', () => {
    expect(combinedSeriesWithoutSecondary.length).toEqual(1);
    expect(combinedSeriesWithoutSecondary[0].type).toEqual('line');
  });
  it('should set the center property of the secondary graph type', () => {
    // need to cast to access added property
    const seriesOptions = combinedSeries[1] as SeriesPieOptions;
    expect(seriesOptions.size).toBeDefined();
  });
  it('should keep the name undefined if given an undefined value', () => {
    expect(combinedSeries[0].name).toEqual('line');
    expect(combinedSeries[1].name).toEqual(undefined);
  });
  it('should keep the color undefined if given an undefined value', () => {
    expect(combinedSeries[0].color).toEqual(undefined);
    expect(combinedSeriesWithoutSecondary[0].color).toEqual('red');
  });
  it('should add the stack value to each primary series', () => {
    expect(combinedSeries[0].stack).toEqual('graph2');
  });
  it('should not add stack for secondary series types', () => {
    expect(combinedSeries[1].stack).toBeUndefined();
  });
  it('should zip the x-axis and y-axis data', () => {
    expect(
      (combinedSeries[0].data = [
        ['1', 1],
        ['2', 2],
        ['3', 3]
      ])
    );
  });
});

describe('Create a synchronized graph series', () => {
  // build series
  const mockPrimarySeriesConfigs = [
    getSeriesConfigurationMock({ seriesType: 'pie', name: undefined }),
    getSeriesConfigurationMock({ seriesType: 'line', name: 'line' }),
    getSeriesConfigurationMock({ seriesType: 'pie', name: 'pie' })
  ];
  const synchronizedSeries = seriesBuilder
    .withData({
      seriesLength: 3,
      xAxisType: 'category',
      xAxisData: mockXData,
      yAxisData: mockYData,
      stackData: mockStackData
    })
    .withBasicSeries(mockPrimarySeriesConfigs)
    .getSynchronizedSeries();

  it('should only create one series', () => {
    expect(synchronizedSeries.length).toEqual(1);
  });
  it('should return the first primary typed series if multiple are given', () => {
    expect(synchronizedSeries[0].name).toEqual('line');
    expect(synchronizedSeries[0].type).toEqual('line');
  });
  it('should add stack for primary graph types', () => {
    expect(synchronizedSeries[0].stack).toEqual('graph2');
  });
});
