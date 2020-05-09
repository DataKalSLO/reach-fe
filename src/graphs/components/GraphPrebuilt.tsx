import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown';
import exporting from 'highcharts/modules/exporting';
import React, { useState, useEffect, useCallback } from 'react';
import GraphHeader from './GraphHeader';
import { StyledGraphDivider, StyledGraphPaper, useGraphStyles } from './styles';
import { GraphPrebuiltProps } from './types';
import { isUndefined } from 'util';

exporting(Highcharts);
drilldown(Highcharts);

/*
 * Renders an individual chart with the header.
 * This component contains two main parts:
 *  1. The header with a set of options (e.g. edit graph)
 *  2. The chart itself
 */
function GraphPrebuilt({ graph }: GraphPrebuiltProps) {
  const classes = useGraphStyles();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  /*
   * Making a Graph Responsive:
   * Highcharts only resizes charts when the window resizes not when
   * a parent container resizes. Since a splitter is used for the
   * Vizbuilder, the chart needs to resize based on the parent container.
   * There are two approaches to handle this:
   *  1. Call the highcharts reflow() function when the splitter
   *     changes, but this can lead to a lot of unnecessary re-rendering.
   *     - for more information on reflow()
   *       see https://api.highcharts.com/highstock/chart.reflow
   *  2. Add the width property to the actual chart. The chart width is by
   *     default set to null. Highcharts then computes the size of the chart
   *     based on the parent container. The issue with this is that when the
   *     parent container resizes, the charts will resize. Then, when the
   *     charts are re-rendered in that smaller parent container the width will
   *     again be set, but it will no longer be able to expand when the parent
   *     container expands. Therefore, the width is initially set to a fraction
   *     of the window width. The chart will be given this width, and then
   *     automatically resize based on the parent. The chart can then also expand
   *     to to the given width when the parent expands. This happens on both
   *     resize and re-rendering, giving the desired behavior.
   *     - for more information on highcharts width
   *       see https://api.highcharts.com/highstock/chart.width
   *
   */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  if (!isUndefined(graph.options.chart) && !isUndefined(windowWidth)) {
    graph.options.chart.width = windowWidth / 2.2;
  }

  return (
    <StyledGraphPaper variant="outlined">
      <GraphHeader graph={graph} />
      <HighchartsReact
        highcharts={Highcharts}
        immutable={true}
        options={graph.options}
        containerProps={{
          className: classes.highcharts
        }}
      />
    </StyledGraphPaper>
  );
}

export default GraphPrebuilt;
