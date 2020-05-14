import {
  DataConfiguration,
  StackConfiguration,
  XAxisConfiguration,
  YAxisConfiguration
} from '../types';

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
