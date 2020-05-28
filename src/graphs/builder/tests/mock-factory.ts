import {
  DataConfiguration,
  GraphConfiguration,
  SeriesConfiguration,
  StackConfiguration,
  XAxisConfiguration,
  YAxisConfiguration
} from '../types';

/*
 * Mock an object of the GraphConfiguration Interface
 */
const getDefaultGraphConfiguration = (): GraphConfiguration => ({
  title: 'title',
  xAxisData: ['x1'],
  yAxisData: [[1, 2]],
  seriesConfigs: [{ seriesType: 'line' }]
});

// function that adds specific property values to the mock object
export const getGraphConfigurationMock = (
  p?: Partial<GraphConfiguration>
): GraphConfiguration => ({
  ...getDefaultGraphConfiguration(),
  ...p
});

/*
 * Mock an object of the SeriesConfiguration Interface
 */
const getDefaultSeriesConfiguration = (): SeriesConfiguration => ({
  seriesType: 'line'
});

export const getSeriesConfigurationMock = (
  p?: Partial<SeriesConfiguration>
): SeriesConfiguration => ({
  ...getDefaultSeriesConfiguration(),
  ...p
});

/*
 * Mock an object of the XAxisConfiguration Interface
 */
const getDefaultXAxisConfiguration = (): XAxisConfiguration => ({});

export const getXAxisConfigurationMock = (
  p?: Partial<XAxisConfiguration>
): XAxisConfiguration => ({
  ...getDefaultXAxisConfiguration(),
  ...p
});

/*
 * Mock an object of the YAxisConfiguration Interface
 */

const getDefaultYAxisConfiguration = (): YAxisConfiguration => ({});

export const getYAxisConfigurationMock = (
  p?: Partial<YAxisConfiguration>
): YAxisConfiguration => ({
  ...getDefaultYAxisConfiguration(),
  ...p
});

/*
 * Mock an object of the StackConfiguration Interface
 */

const getDefaultStackConfiguration = (): StackConfiguration => ({});

export const getStackConfigurationMock = (
  p?: Partial<StackConfiguration>
): StackConfiguration => ({
  ...getDefaultStackConfiguration(),
  ...p
});

/*
 * Mock an object of the DataConfiguration Interface
 */
const getDefaultDataConfiguration = (): DataConfiguration => ({
  seriesLength: 1,
  xAxisType: 'category',
  xAxisData: ['1'],
  yAxisData: [[1, 2]],
  stackData: [1]
});

export const getDataConfigurationMock = (
  p?: Partial<DataConfiguration>
): DataConfiguration => ({
  ...getDefaultDataConfiguration(),
  ...p
});
