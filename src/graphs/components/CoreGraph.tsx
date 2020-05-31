import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import React, { forwardRef, useMemo } from 'react';
import { isUndefined } from 'util';
import { Graph } from '../../redux/graphbuilder/types';
import GraphCreator from '../builder/graph-creator';
import { GraphConfiguration } from '../builder/types';
exporting(Highcharts);

/*
 * "containerProps" allows you to pass an object
 * to the chart container.
 *  - For more information see https://github.com/highcharts/highcharts-react
 */
export interface Props {
  graph: Graph;
  width?: string | number; // option to give an explicit width
  height?: string | number; // option to give an explicit height
  containerProps?: { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const CoreGraph = forwardRef<HighchartsReact, Props>(
  (props: Props, ref) => {
    const { graph, width, height, containerProps } = props;
    const graphCreator = new GraphCreator();
    const newRef = ref as React.RefObject<HighchartsReact> | undefined;

    return useMemo(() => {
      const createGraphOptions = (graph: Graph): Highcharts.Options => {
        const graphConfig: GraphConfiguration = {
          ...graph.graphMetaData.graphOptions,
          title: graph.graphMetaData.graphTitle,
          xAxisData: graph.graphData.xAxisData,
          yAxisData: graph.graphData.yAxisData
        };

        /*
         * "graphCreator" always returns a list of "graphOptions", but the
         * "createBasicGraph" method should only generate one.
         */
        const graphOptions: Highcharts.Options = graphCreator.createBasicGraph(
          graphConfig
        ).graphOptions[0];

        // set the explicit width and height if given
        if (
          !isUndefined(graphOptions.chart) &&
          !isUndefined(width) &&
          !isUndefined(height)
        ) {
          graphOptions.chart.width = width;
          graphOptions.chart.height = height;
        }

        return graphOptions;
      };

      return (
        <HighchartsReact
          highcharts={Highcharts}
          immutable={true}
          options={createGraphOptions(graph)}
          containerProps={containerProps}
          ref={newRef}
        />
      );
    }, [containerProps, graph, graphCreator, height, newRef, width]);
  }
);

CoreGraph.displayName = 'Highcharts Graph';
