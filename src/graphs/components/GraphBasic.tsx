import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { GraphChildrenProps } from './types';
import { Container, Card } from '@material-ui/core';
import { useGraphStyles } from '../container/styles';
import GraphHeader from '../forms/GaphHeader';
import highcharts3d from 'highcharts/highcharts-3d';
import exporting from 'highcharts/modules/exporting';
highcharts3d(Highcharts);
exporting(Highcharts);

/*
 * Renders a list of either "Basic", "3D", or "Combined" graphs.
 * The collection of graphs is treated as one item; therefore,
 * only one header is created.
 * - see '../builder/types for more information on graph Types
 */

export function GraphBasic({ graphs, highchartsType }: GraphChildrenProps) {
  const classes = useGraphStyles();
  const graphComponents = graphs.map((graph, index) => {
    return (
      <HighchartsReact
        key={index}
        highcharts={highchartsType}
        options={graph.getOptions()}
        constructorType={graph.getChartConstructor()}
        containerProps={{ className: classes.highcharts }}
      />
    );
  });
  return (
    <Card className={classes.root}>
      <GraphHeader />
      <Container className={classes.graphContainer}>
        {graphComponents}
      </Container>
    </Card>
  );
}
