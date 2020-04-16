import { Box, Card, Container } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown';
import exporting from 'highcharts/modules/exporting';
import React from 'react';
import { DEFAULT_KEY } from './constants';
import GraphHeader from './GraphHeader';
import { useGraphStyles } from './styles';
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
  // TODO: add support for a drilldown graph
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../prebuilt-graph-options/DoDDrilldown2018.json');
  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <GraphHeader graph={{ id: DEFAULT_KEY, options: options }} />
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
