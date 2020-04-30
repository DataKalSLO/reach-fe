import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import React, { forwardRef, useMemo } from 'react';
import { GraphRef, GraphProps } from './types';
import { useGraphStyles } from './styles';
exporting(Highcharts);

/*
 * Wrapper for HighchartsReact that renders a graph.
 */

const Graph = forwardRef<HighchartsReact, GraphProps>(
  (props: GraphProps, ref) => {
    const classes = useGraphStyles();
    const newRef = ref as
      | string
      | ((instance: HighchartsReact | null) => void)
      | React.RefObject<HighchartsReact>
      | null
      | undefined;
    return useMemo(() => {
      return (
        <HighchartsReact
          highcharts={Highcharts}
          immutable={true}
          options={props.graphRecord.options}
          ref={newRef}
          containerProps={{ className: classes.highcharts }}
        />
      );
    }, [classes.highcharts, newRef, props.graphRecord.options]);
  }
);

Graph.displayName = 'Highcharts Graph';

export default Graph;
