import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import { useGraphStyles, useGraphContainerStyles } from '../container/styles';
import { Container, Card, Box } from '@material-ui/core';
import GraphHeader from '../forms/GaphHeader';
import { GraphPredefinedProps } from './types';
exporting(Highcharts);

function GraphPremade({ graphData, graphId }: GraphPredefinedProps) {
  const containerClasses = useGraphContainerStyles();
  const classes = useGraphStyles();
  return (
    <Box className={containerClasses.item}>
      <Card className={classes.root}>
        <GraphHeader graphId={graphId} />
        <Container className={classes.graphContainer}>
          <HighchartsReact
            highcharts={Highcharts}
            options={graphData}
            containerProps={{ className: classes.highcharts }}
          />
        </Container>
      </Card>
    </Box>
  );
}

export default GraphPremade;
