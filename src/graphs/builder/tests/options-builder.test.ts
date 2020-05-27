import Highcharts from 'highcharts';
import {
  DEFAULT_STACK_TYPE,
  TOOLTIP_STACK_FOOTER_PREFIX,
  TOOLTIP_STACK_FOOTER_VALUE
} from '../constants';
import { plotOptions, syncExtremes, xAxis } from '../default-graph-options';
import OptionsBuilder from '../options_builder';
import {
  getDataConfigurationMock,
  getStackConfigurationMock,
  getXAxisConfigurationMock,
  getYAxisConfigurationMock
} from './mock-factory';

/*
 * Test the Options Builder functionality.
 * The set of methods in this class are responsible
 * for generating one part of of the options object,
 * which is required by Highcharts.
 */
const optionsBuilder = new OptionsBuilder();
const mockText = 'mock';

describe('withGraphTitle(): adds a title to a graph', () => {
  it('should add a default title if one is not passed', () => {
    expect(optionsBuilder.withGraphTitle().getOptions().title.text).toEqual(
      'Chart'
    );
  });
  it('should add a title to the options', () => {
    expect(
      optionsBuilder.withGraphTitle(mockText).getOptions().title.text
    ).toEqual(mockText);
  });
});

describe('withGraphSubtitle(): adds the subtitle to a graph', () => {
  it('should add an empty subtitle if one is not passed', () => {
    expect(
      optionsBuilder.withGraphSubtitle().getOptions().subtitle.text
    ).toEqual('');
  });
  it('should add a subtitle to the options', () => {
    expect(
      optionsBuilder.withGraphSubtitle(mockText).getOptions().subtitle.text
    ).toEqual(mockText);
  });
});

describe('withXAxis(): add x-axis properties', () => {
  const mockDataConfigDate = getDataConfigurationMock({
    xAxisType: 'datetime',
    xAxisData: [123, 345]
  });

  it('should add a title for the x-axis', () => {
    // should add an empty string if undefined
    expect(optionsBuilder.withXAxis().getOptions().xAxis.title?.text).toEqual(
      ''
    );
    // should set the title if not undefined
    optionsBuilder.withXAxis(getXAxisConfigurationMock({ title: mockText }));
    expect(
      optionsBuilder
        .withXAxis(getXAxisConfigurationMock({ title: mockText }))
        .getOptions().xAxis.title?.text
    ).toEqual(mockText);
  });
  it('should not override x-axis options when adding more x-axis options', () => {
    expect(
      optionsBuilder.withXAxisDataType(mockDataConfigDate).getOptions().xAxis
        .type
    ).toEqual('datetime');
  });
});

describe('withXAxisDataType(): add the correct x-axis type', () => {
  const mockDataConfigStr = getDataConfigurationMock({
    xAxisType: 'category',
    xAxisData: ['1', '2']
  });
  const mockDataConfigNum = getDataConfigurationMock({
    xAxisType: 'linear',
    xAxisData: [1, 2]
  });
  const mockDataConfigDate = getDataConfigurationMock({
    xAxisType: 'datetime',
    xAxisData: [123, 345]
  });

  it('should add the correct x-axis type', () => {
    expect(
      optionsBuilder.withXAxisDataType(mockDataConfigDate).getOptions().xAxis
        .type
    ).toEqual('datetime');
    expect(
      optionsBuilder.withXAxisDataType(mockDataConfigNum).getOptions().xAxis
        .type
    ).toEqual('linear');
    expect(
      optionsBuilder.withXAxisDataType(mockDataConfigStr).getOptions().xAxis
        .type
    ).toEqual('category');
  });
  it('should add the categories only if the x-axis type is a string', () => {
    expect(
      optionsBuilder.withXAxisDataType(mockDataConfigDate).getOptions().xAxis
        .categories
    ).toBeUndefined();
    expect(
      optionsBuilder.withXAxisDataType(mockDataConfigNum).getOptions().xAxis
        .categories
    ).toBeUndefined();
    expect(
      optionsBuilder.withXAxisDataType(mockDataConfigStr).getOptions().xAxis
        .categories
    ).toEqual(['1', '2']);
  });
  it('should not override x-axis options when adding more x-axis options', () => {
    expect(
      optionsBuilder.withXAxisDataType(mockDataConfigStr).getOptions().xAxis
    ).toMatchObject(xAxis);
  });
});

describe('withYAxis(): add y-axis properties', () => {
  it('should add a title for the y-axis', () => {
    // should add an empty string if undefined
    expect(
      optionsBuilder.withYAxis().getOptions().yAxis[0].title?.text
    ).toEqual('');
    // should set the title if not undefined
    expect(
      optionsBuilder
        .withYAxis(getYAxisConfigurationMock({ title: mockText }))
        .getOptions().yAxis[0].title?.text
    ).toEqual(mockText);
  });
  it('should add a prefix/suffix to the y-axis labels', () => {
    const options = optionsBuilder
      .withYAxis(
        getYAxisConfigurationMock({
          valuePrefix: mockText,
          valueSuffix: mockText
        })
      )
      .getOptions();
    expect(options.tooltip?.valuePrefix).toEqual(mockText);
    expect(options.tooltip?.valueSuffix).toEqual(mockText);
  });
  it('should always return a one-item list since multiple axes is not supported', () => {
    // no y-axis options are given
    expect(
      optionsBuilder.withYAxis(getYAxisConfigurationMock()).getOptions().yAxis
        .length
    ).toEqual(1);
    // some y-axis options are given
    expect(
      optionsBuilder
        .withYAxis(getYAxisConfigurationMock({ title: mockText }))
        .getOptions().yAxis.length
    ).toEqual(1);
  });
});

describe('withStack(): enable stacking', () => {
  const mockData = ['1', 2];
  it('should not add the stacking property if stackData is undefined', () => {
    expect(
      optionsBuilder.withStack().getOptions().plotOptions.series?.stacking
    ).toBeUndefined();
  });
  it('should add the default stacking property', () => {
    expect(
      optionsBuilder.withStack(mockData).getOptions().plotOptions.series
        ?.stacking
    ).toEqual(DEFAULT_STACK_TYPE);
  });
  it('should not override any current settings', () => {
    expect(
      optionsBuilder.withStack(mockData).getOptions().plotOptions.series
    ).toMatchObject(plotOptions.series as Highcharts.PlotSeriesOptions);
  });
});

describe('withStackOptions(): add stack properties for data', () => {
  it('should add a stack title to the tooltip', () => {
    // should not be defined if not given a stack config
    expect(
      optionsBuilder.withStackOptions().getOptions().tooltip?.footerFormat
    ).toBeUndefined();
    // should add the given stack title
    expect(
      optionsBuilder
        .withStackOptions(getStackConfigurationMock({ title: mockText }))
        .getOptions().tooltip?.footerFormat
    ).toEqual(mockText + TOOLTIP_STACK_FOOTER_VALUE);
  });

  it('should change the stack type if given', () => {
    const mockData = ['1', 2];
    // add the default stack type
    optionsBuilder.withStack(mockData);
    // should not change the stack type if undefined
    expect(
      optionsBuilder.withStackOptions().getOptions().plotOptions.series
        ?.stacking
    ).toEqual(DEFAULT_STACK_TYPE);
    // should change the stack type if given
    expect(
      optionsBuilder
        .withStackOptions(getStackConfigurationMock({ type: 'percent' }))
        .getOptions().plotOptions.series?.stacking
    ).toEqual('percent');
  });

  it('should not override any current settings', () => {
    // should not override current plot options
    expect(
      optionsBuilder.withStackOptions(getStackConfigurationMock()).getOptions()
        .plotOptions.series
    ).toMatchObject(plotOptions.series as Highcharts.PlotSeriesOptions);
  });
});

describe('with3DOptions(): add 3D properties', () => {
  it('should add the predefined 3D options', () => {
    const options = optionsBuilder.with3DOptions().getOptions();
    expect(options.chart.options3d?.enabled).toBe(true);
    // The actual values may change over time, just make sure they are defined
    expect(options.chart.options3d?.alpha).toBeDefined();
    expect(options.chart.options3d?.beta).toBeDefined();
    expect(options.chart.options3d?.viewDistance).toBeDefined();
    expect(options.chart.options3d?.depth).toBeDefined();
  });

  it('should skew the x axis labels for 3D options', () => {
    // The actual values may change over time, just make sure they are defined
    expect(
      optionsBuilder.with3DOptions().getOptions().xAxis.labels?.skew3d
    ).toBeDefined();
  });
});

describe('withCombinedOptions(): add properties for a combined graph', () => {
  it('should add the predefined combined graph options', () => {
    const options = optionsBuilder.withCombinedOptions().getOptions();
    expect(options.plotOptions.pie?.showInLegend).toBe(false);
    expect(options.plotOptions.pie?.dataLabels).toEqual({
      enabled: true,
      borderColor: undefined
    });
    // The actual values may change over time, just make sure they are defined
    expect(options.plotOptions.pie?.dataLabels).toEqual({ enabled: true });
    expect(options.plotOptions.pie?.center).toBeDefined();
    expect(options.plotOptions.pie?.center?.length).toEqual(2);
  });

  it('should not override any current settings', () => {
    // should not override current plot options
    expect(
      optionsBuilder.withCombinedOptions().getOptions().plotOptions.pie
    ).toMatchObject(plotOptions.pie as Highcharts.PlotSeriesOptions);
  });
});

describe('withSynchronizedOptions(): add properties for a synchronized graph', () => {
  it('should add the predefined synchronization options', () => {
    const options = optionsBuilder.withSynchronizedOptions().getOptions();
    expect(options.xAxis.events?.setExtremes).toEqual(syncExtremes);
    // The actual values may change over time, just make sure they are defined
    expect(options.chart.marginLeft).toBeDefined();
    expect(options.chart.spacingTop).toBeDefined();
    expect(options.chart.spacingBottom).toBeDefined();
    expect(options.chart.className).toBeDefined();
    expect(options.tooltip).toBeDefined();
  });
});
