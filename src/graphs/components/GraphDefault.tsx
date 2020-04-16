import React from 'react';
import GraphHeader from './GraphHeader';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import drilldown from 'highcharts/modules/drilldown';
import { useGraphStyles } from './styles';
import { Container, Card, Box } from '@material-ui/core';
import * as consts from './constants';
exporting(Highcharts);
drilldown(Highcharts);

/*
 * This component serves two purposes.
 *  1. Show a default chart that rather than an empty page
 *  2. Show a demonstration of the drilldown chart, which is
 *     currently not supported but it will.
 *     - see https://www.highcharts.com/docs/chart-concepts/drilldown
 */

function GraphDefault() {
  const classes = useGraphStyles();
  // this will be removed when we connect to the database
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../prebuilt-graph-options/DoDDrilldown2018.json');
  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <GraphHeader graph={{ id: consts.DEFAULT_KEY, options: options }} />
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
