import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import React from 'react';
import { GraphProps } from './types';
exporting(Highcharts);

/*
 * Wrapper for HighchartsReact that renders a graph.
 */

function Graph({ graphRecord }: GraphProps) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      immutable={true}
      options={graphRecord.options}
    />
  );
}

export default Graph;
