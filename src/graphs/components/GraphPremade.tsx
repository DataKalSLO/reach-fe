import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
import exporting from 'highcharts/modules/exporting';
import drilldown from 'highcharts/modules/drilldown';
import { useGraphStyles } from '../container/styles';
import { Container, Card } from '@material-ui/core';
import GraphHeader from '../forms/GaphHeader';
import { GraphPremadeProps } from './types';
highcharts3d(Highcharts);
exporting(Highcharts);
drilldown(Highcharts);

export function GraphPremade({ optionsList }: GraphPremadeProps) {
  const classes = useGraphStyles();
  const graphComponents = optionsList.map((options, index) => {
    return (
      <HighchartsReact
        key={index}
        highcharts={Highcharts}
        options={options}
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
