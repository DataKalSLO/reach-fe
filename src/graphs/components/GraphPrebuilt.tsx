import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import React from 'react';
import GraphHeader from './GraphHeader';
import drilldown from 'highcharts/modules/drilldown';

import {
  StyledGraph,
  StyledGraphBox,
  StyledGraphCard,
  useGraphStyles
} from './styles';
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
    <StyledGraphBox>
      <StyledGraphCard>
        <GraphHeader graph={graph} />
        <StyledGraph>
          <HighchartsReact
            highcharts={Highcharts}
            immutable={true}
            options={graph.options}
            containerProps={{ className: classes.highcharts }}
          />
        </StyledGraph>
      </StyledGraphCard>
    </StyledGraphBox>
  );
}

export default GraphPrebuilt;
