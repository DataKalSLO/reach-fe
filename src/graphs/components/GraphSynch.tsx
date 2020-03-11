import React, { Fragment } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { GraphChildrenProps } from './types';
import { Card, Container } from '@material-ui/core';
import { SYNCH_GRAPH_ID } from '../builder/constants';
import { isUndefined } from 'util';
import { useGraphStyles } from '../container/styles';
import GraphHeader from '../forms/GaphHeader';
import exporting from 'highcharts/modules/exporting';
import GraphEdit from '../forms/GraphEdit';
exporting(Highcharts);

/*
 * Renders a list of "Basic" graphs used to create a
 * "Synchronized" graph. The tooltips and x-axis extreme values
 * are all synchronized. Events that occur on one graph will reflect
 * changes to all the graphs.
 * - see '../builder/types for more information on graph Types
 */

export function GraphSynch({
  graphs,
  graphId,
  highchartsType
}: GraphChildrenProps) {
  // required for synchronization
  highchartsType.Pointer.prototype.reset = () => {
    return undefined;
  };

  // required for synchronization
  highchartsType.Point.prototype.highlight = function(
    event: Highcharts.PointerEventObject
  ) {
    event = this.series.chart.pointer.normalize(event);
    this.onMouseOver(); // Show the hover marker
    this.series.chart.tooltip.refresh(this); // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
  };

  // required for synchronization
  function handleMouseMove(event: React.MouseEvent<HTMLElement>): void {
    // cannot cast MouseEvent to Highcharts Event (need to use any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventTyped: any = event;
    let point: Highcharts.Point | undefined;
    highchartsType.charts.forEach(chart => {
      if (
        !isUndefined(chart) &&
        chart.userOptions.chart?.className === SYNCH_GRAPH_ID
      ) {
        const event = chart.pointer.normalize(eventTyped); // Find coordinates within the chart
        point = chart.series[0].searchPoint(event, true); // Get the hovered point
      }
      if (point) {
        point.highlight(eventTyped);
      }
    });
  }

  const classes = useGraphStyles();
  const createdGraphs = graphs.map((graph, index) => {
    return (
      <Fragment key={index}>
        <HighchartsReact
          key={index}
          highcharts={highchartsType}
          options={graph.getOptions()}
          constructorType={graph.getChartConstructor()}
          containerProps={{ className: classes.highcharts }}
        />
      </Fragment>
    );
  });

  return (
    <Card className={classes.root}>
      <GraphHeader graphId={graphId} />
      <Container
        onMouseMove={handleMouseMove}
        className={classes.graphContainer}
      >
        {createdGraphs}
      </Container>
      <GraphEdit graphs={graphs} />
    </Card>
  );
}
