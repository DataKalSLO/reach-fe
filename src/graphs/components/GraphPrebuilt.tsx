import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  styled
} from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from 'highcharts/highcharts-3d';
import drilldown from 'highcharts/modules/drilldown';
import exporting from 'highcharts/modules/exporting';
import React, { useEffect, useState } from 'react';
import { isUndefined } from 'util';
import { CHART_HEIGHT_PERCENT, CHART_WIDTH_SCALE } from './constants';
import GraphToolbar from './GraphToolbar';
import { useGraphStyles } from './styles';
import { GraphPrebuiltProps } from './types';
import GraphCreator from '../builder/graph-creator';
import { GraphConfiguration } from '../builder/types';
import { Graph } from '../../redux/graphbuilder/types';

highcharts3d(Highcharts);
exporting(Highcharts);
drilldown(Highcharts);

/*
 * Renders an individual Graph with the toolbar.
 * This component contains two main parts:
 *  1. The graph toolbar
 *  2. The graph itself
 */
function GraphPrebuilt({ graph }: GraphPrebuiltProps) {
  const classes = useGraphStyles();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(false);
  const graphCreator = new GraphCreator();

  /*
   * Set the graph width when the window resizes
   */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    setExpanded(false);
  }, [graph]);

  const createGraphOptions = (graph: Graph): Highcharts.Options => {
    const graphConfig: GraphConfiguration = {
      ...graph.graphMetaData.graphOptions,
      title: graph.graphMetaData.graphTitle,
      xAxisData: graph.graphData.xAxisData,
      yAxisData: graph.graphData.yAxisData
    };
    const graphOptions: Highcharts.Options = graphCreator.createBasicGraph(
      graphConfig
    ).graphOptions[0];
    if (!isUndefined(graphOptions.chart) && !isUndefined(windowWidth)) {
      graphOptions.chart.width = windowWidth * CHART_WIDTH_SCALE;
      graphOptions.chart.height = CHART_HEIGHT_PERCENT;
    }
    return graphOptions;
  };

  return (
    <Card variant="outlined">
      <GraphCardActions></GraphCardActions>
      <GraphDivider light />
      <CardContent>
        <HighchartsReact
          highcharts={Highcharts}
          immutable={true}
          options={createGraphOptions(graph)}
          containerProps={{
            className: classes.highcharts
          }}
        />
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <FormCardContent></FormCardContent>
      </Collapse>
    </Card>
  );
}

export default GraphPrebuilt;

/*
 * Styles
 */
const GraphCardActions = styled(CardActions)({
  padding: '0px'
});

const GraphDivider = styled(Divider)({
  marginBottom: '10px'
});

const FormCardContent = styled(CardContent)({
  padding: '0px'
});
