import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown';
import exporting from 'highcharts/modules/exporting';
import React from 'react';
import GraphHeader from './GraphHeader';
import { StyledGraphDivider, StyledGraphPaper, useGraphStyles } from './styles';
import { GraphPrebuiltProps } from './types';

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
  return (
    <StyledGraphPaper variant="outlined">
      <GraphHeader graph={graph} />
      <StyledGraphDivider light />
      <HighchartsReact
        highcharts={Highcharts}
        immutable={true}
        options={graph.options}
        containerProps={{ className: classes.highcharts }}
      />
    </StyledGraphPaper>
  );
}

export default GraphPrebuilt;
