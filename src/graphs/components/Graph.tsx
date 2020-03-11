import React, { Fragment } from 'react';
import HighchartsChart from 'highcharts';
import HighchartsStock from 'highcharts/highstock';
import GraphCreator from '../builder/graph-creator';
import { graphTypesEnum, GraphProps, GraphType } from './types';
import { GraphConfiguration } from '../builder/types';
import { convertGraphDataToGraphConfig } from './utilities';
import { GraphBasic } from './GraphBasic';
import { GraphSynch } from './GraphSynch';
import { X_AXIS_CATEGORY_TYPE } from '../builder/constants';

/*
 * This component renders a set of graph
 */
export function Graph({ graphData }: GraphProps) {
  const graphConfig: GraphConfiguration = convertGraphDataToGraphConfig(
    graphData
  );
  const xAxisIsCategory: boolean =
    graphConfig.xAxis.axisType === X_AXIS_CATEGORY_TYPE;

  const highchartsType = xAxisIsCategory ? HighchartsChart : HighchartsStock;
  const graphType: GraphType = graphData.graphType;
  const graphCreator = new GraphCreator();

  const getGraph = () => {
    switch (graphType) {
      case graphTypesEnum.basic:
        return (
          <GraphBasic
            graphs={graphCreator.createBasicGraph(graphConfig)}
            highchartsType={highchartsType}
          />
        );
      case graphTypesEnum.threeD:
        return (
          <GraphBasic
            graphs={graphCreator.create3DGraph(graphConfig)}
            highchartsType={highchartsType}
          />
        );
      case graphTypesEnum.combined:
        return (
          <GraphBasic
            graphs={graphCreator.createCombinedGraph(graphConfig)}
            highchartsType={highchartsType}
          />
        );
      case graphTypesEnum.synchronized:
        return (
          <GraphSynch
            graphs={graphCreator.createSynchronizedGraph(graphConfig)}
            highchartsType={highchartsType}
          />
        );
    }
  };
  return <Fragment>{getGraph()}</Fragment>;
}
