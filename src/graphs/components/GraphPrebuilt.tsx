import { Box, Card, Container } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import React from 'react';
import GraphHeader from './GraphHeader';
import { useGraphStyles } from './styles';
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
