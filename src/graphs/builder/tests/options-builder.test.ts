import Highcharts from 'highcharts';
import {
  DEFAULT_STACK_TYPE,
  DEFAULT_SUBTITLE_WITH_SOURCE,
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
  it('should add a title to the options', () => {
    optionsBuilder.withGraphTitle(mockText);
    expect(optionsBuilder.getOptions().title.text).toEqual(mockText);
  });
});

describe('withGraphSourceURL(): adds the data source in the subtitle', () => {
  it('should add an empty subtitle if one is not passed', () => {
    optionsBuilder.withGraphTitle(mockText);
    expect(optionsBuilder.getOptions().subtitle.text).toEqual('');
  });
  it('should add a subtitle with the data source url', () => {
    optionsBuilder.withGraphSourceURL(mockText);
    expect(optionsBuilder.getOptions().subtitle.text).toEqual(
      DEFAULT_SUBTITLE_WITH_SOURCE + mockText
    );
  });
});

describe('withXAxis(): add x-axis properties', () => {
  const mockDataConfigDate = getDataConfigurationMock({
    xAxisType: 'datetime',
    xAxisData: [123, 345]
  });

  it('should add a title for the x-axis', () => {
    // should add an empty string if undefined
    optionsBuilder.withXAxis(getXAxisConfigurationMock());
    expect(optionsBuilder.getOptions().xAxis.title?.text).toEqual('');
    // should set the title if not undefined
    optionsBuilder.withXAxis(getXAxisConfigurationMock({ title: mockText }));
    expect(optionsBuilder.getOptions().xAxis.title?.text).toEqual(mockText);
  });
  it('should not override x-axis options when adding more x-axis options', () => {
    optionsBuilder.withXAxisDataType(mockDataConfigDate);
    expect(optionsBuilder.getOptions().xAxis.type).toEqual('datetime');
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
    optionsBuilder.withXAxisDataType(mockDataConfigDate);
    expect(optionsBuilder.getOptions().xAxis.type).toEqual('datetime');
    optionsBuilder.withXAxisDataType(mockDataConfigNum);
    expect(optionsBuilder.getOptions().xAxis.type).toEqual('linear');
    optionsBuilder.withXAxisDataType(mockDataConfigStr);
    expect(optionsBuilder.getOptions().xAxis.type).toEqual('category');
  });
  it('should add the categories only if the x-axis type is a string', () => {
    optionsBuilder.withXAxisDataType(mockDataConfigDate);
    expect(optionsBuilder.getOptions().xAxis.categories).toBeUndefined();
    optionsBuilder.withXAxisDataType(mockDataConfigNum);
    expect(optionsBuilder.getOptions().xAxis.categories).toBeUndefined();
    optionsBuilder.withXAxisDataType(mockDataConfigStr);
    expect(optionsBuilder.getOptions().xAxis.categories).toEqual(['1', '2']);
  });
  it('should not override x-axis options when adding more x-axis options', () => {
    optionsBuilder.withXAxisDataType(mockDataConfigStr);
    expect(optionsBuilder.getOptions().xAxis).toMatchObject(xAxis);
  });
});

describe('withYAxis(): add y-axis properties', () => {
  it('should add a title for the y-axis', () => {
    // should add an empty string if undefined
    optionsBuilder.withYAxis(getYAxisConfigurationMock());
    expect(optionsBuilder.getOptions().yAxis[0].title?.text).toEqual('');
    // should set the title if not undefined
    optionsBuilder.withYAxis(getYAxisConfigurationMock({ title: mockText }));
    expect(optionsBuilder.getOptions().yAxis[0].title?.text).toEqual(mockText);
  });
  it('should add a prefix/suffix to the y-axis labels', () => {
    optionsBuilder.withYAxis(
      getYAxisConfigurationMock({
        valuePrefix: mockText,
        valueSuffix: mockText
      })
    );
    const options = optionsBuilder.getOptions();
    expect(options.tooltip?.valuePrefix).toEqual(mockText);
    expect(options.tooltip?.valueSuffix).toEqual(mockText);
  });
  it('should always return a one-item list since multiple axes is not supported', () => {
    // no y-axis options are given
    optionsBuilder.withYAxis(getYAxisConfigurationMock());
    expect(optionsBuilder.getOptions().yAxis.length).toEqual(1);
    // some y-axis options are given
    optionsBuilder.withYAxis(getYAxisConfigurationMock({ title: mockText }));
    expect(optionsBuilder.getOptions().yAxis.length).toEqual(1);
  });
});

describe('withStack(): enable stacking', () => {
  it('should add the default stacking property', () => {
    optionsBuilder.withStack();
    expect(optionsBuilder.getOptions().plotOptions.series?.stacking).toEqual(
      DEFAULT_STACK_TYPE
    );
  });
  it('should not override any current settings', () => {
    optionsBuilder.withStack();
    expect(optionsBuilder.getOptions().plotOptions.series).toMatchObject(
      plotOptions.series as Highcharts.PlotSeriesOptions
    );
  });
});

describe('withStackOptions(): add stack properties for data', () => {
  it('should add a stack title to the tooltip', () => {
    // should add a default title if undefined
    optionsBuilder.withStackOptions(getStackConfigurationMock());
    expect(optionsBuilder.getOptions().tooltip?.footerFormat).toEqual(
      TOOLTIP_STACK_FOOTER_PREFIX + TOOLTIP_STACK_FOOTER_VALUE
    );
    // should add the given stack title
    optionsBuilder.withStackOptions(
      getStackConfigurationMock({ title: mockText })
    );
    expect(optionsBuilder.getOptions().tooltip?.footerFormat).toEqual(
      mockText + TOOLTIP_STACK_FOOTER_VALUE
    );
  });

  it('should change the stack type if given', () => {
    // add the default stack type
    optionsBuilder.withStack();
    // should not change the stack type if undefined
    optionsBuilder.withStackOptions(getStackConfigurationMock());
    expect(optionsBuilder.getOptions().plotOptions.series?.stacking).toEqual(
      DEFAULT_STACK_TYPE
    );
    // should change the stack type if given
    optionsBuilder.withStackOptions(
      getStackConfigurationMock({ type: 'percent' })
    );
    expect(optionsBuilder.getOptions().plotOptions.series?.stacking).toEqual(
      'percent'
    );
  });

  it('should not override any current settings', () => {
    // should not override current plot options
    optionsBuilder.withStackOptions(getStackConfigurationMock());
    expect(optionsBuilder.getOptions().plotOptions.series).toMatchObject(
      plotOptions.series as Highcharts.PlotSeriesOptions
    );
  });
});

describe('with3DOptions(): add 3D properties', () => {
  it('should add the predefined 3D options', () => {
    optionsBuilder.with3DOptions();
    const options = optionsBuilder.getOptions();
    expect(options.chart.options3d?.enabled).toBe(true);
    // The actual values may change over time, just make sure they are defined
    expect(options.chart.options3d?.alpha).toBeDefined();
    expect(options.chart.options3d?.beta).toBeDefined();
    expect(options.chart.options3d?.viewDistance).toBeDefined();
    expect(options.chart.options3d?.depth).toBeDefined();
  });

  it('should skew the x axis labels for 3D options', () => {
    optionsBuilder.with3DOptions();
    // The actual values may change over time, just make sure they are defined
    expect(optionsBuilder.getOptions().xAxis.labels?.skew3d).toBeDefined();
  });
});

describe('withCombinedOptions(): add properties for a combined graph', () => {
  it('should add the predefined combined graph options', () => {
    optionsBuilder.withCombinedOptions();
    const options = optionsBuilder.getOptions();
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
    optionsBuilder.withCombinedOptions();
    expect(optionsBuilder.getOptions().plotOptions.pie).toMatchObject(
      plotOptions.pie as Highcharts.PlotSeriesOptions
    );
  });
});

describe('withSynchronizedOptions(): add properties for a synchronized graph', () => {
  it('should add the predefined synchronization options', () => {
    optionsBuilder.withSynchronizedOptions();
    const options = optionsBuilder.getOptions();
    expect(options.xAxis.events?.setExtremes).toEqual(syncExtremes);
    // The actual values may change over time, just make sure they are defined
    expect(options.chart.marginLeft).toBeDefined();
    expect(options.chart.spacingTop).toBeDefined();
    expect(options.chart.spacingBottom).toBeDefined();
    expect(options.chart.className).toBeDefined();
    expect(options.tooltip).toBeDefined();
  });
});
