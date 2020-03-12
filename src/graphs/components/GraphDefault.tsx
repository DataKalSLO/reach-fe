import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import drilldown from 'highcharts/modules/drilldown';
import { useGraphStyles, useGraphContainerStyles } from '../container/styles';
import { Container, Card, Box } from '@material-ui/core';
import GraphHeader from '../forms/GaphHeader';
exporting(Highcharts);
drilldown(Highcharts);

function GraphDefault() {
  const containerClasses = useGraphContainerStyles();
  const classes = useGraphStyles();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graph-options/DoDDrilldown2018.json');
  return (
    <Box className={containerClasses.item}>
      <Card className={classes.root}>
        <GraphHeader graphId={'default'} />
        <Container className={classes.graphContainer}>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ className: classes.highcharts }}
          />
        </Container>
      </Card>
    </Box>
  );
}

export default GraphDefault;
