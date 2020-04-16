import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import GraphHeader from './GraphHeader';
import { useGraphStyles } from './styles';
import { Container, Card, Box } from '@material-ui/core';
import { GraphPrebuiltProps } from './types';
exporting(Highcharts);

/*
 * Renders an individual chart with the header.
 */

function GraphPrebuilt({ graph }: GraphPrebuiltProps) {
  const classes = useGraphStyles();

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <GraphHeader graph={graph} />
        <Container className={classes.graphContainer}>
          <HighchartsReact
            highcharts={Highcharts}
            immutable={true}
            options={graph.options}
            containerProps={{ className: classes.highcharts }}
          />
        </Container>
      </Card>
    </Box>
  );
}

export default GraphPrebuilt;
