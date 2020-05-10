import { Divider, Paper, styled } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown';
import exporting from 'highcharts/modules/exporting';
import React, { useEffect, useState } from 'react';
import { isUndefined } from 'util';
import { CHART_HEIGHT_PERCENT, CHART_WIDTH_SCALE } from './constants';
import GraphToolbar from './GraphToolbar';
import { useGraphStyles } from './styles';
import { GraphPrebuiltProps } from './types';

exporting(Highcharts);
drilldown(Highcharts);

/*
 * Renders an individual Graph with the toolbar.
 * This component contains two main parts:
 *  1. The graph toolbar
 *  2. The graph itself
 */
function GraphPrebuilt({ graph }: GraphPrebuiltProps) {
  const classes = useGraphStyles();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  /*
   * Set the graph width when the window resizes
   */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  /*
   * Allow graph to resize to the dimensions of parent container
   */
  if (!isUndefined(graph.options.chart) && !isUndefined(windowWidth)) {
    graph.options.chart.width = windowWidth * CHART_WIDTH_SCALE;
    graph.options.chart.height = CHART_HEIGHT_PERCENT;
  }

  return (
    <GraphPaper variant="outlined">
      <GraphToolbar graph={graph} />
      <GraphDivider light />
      <HighchartsReact
        highcharts={Highcharts}
        immutable={true}
        options={graph.options}
        containerProps={{
          className: classes.highcharts
        }}
      />
    </GraphPaper>
  );
}

export default GraphPrebuilt;

/*
 * Styles
 */
const GraphPaper = styled(Paper)({
  borderWidth: '2px'
});

const GraphDivider = styled(Divider)({
  height: '2px',
  marginBottom: '10px'
});
