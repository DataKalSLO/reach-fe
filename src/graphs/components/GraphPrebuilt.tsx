import {
  Card,
  CardActions,
  CardContent,
  Divider,
  styled,
  Collapse,
  Typography
} from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown';
import exporting from 'highcharts/modules/exporting';
import React, { useEffect, useState } from 'react';
import { isUndefined } from 'util';
import { CHART_HEIGHT_PERCENT, CHART_WIDTH_SCALE } from './constants';
import GraphToolbar from './GraphToolbar';
import { useGraphStyles } from './styles';
import { GraphPrebuiltProps } from './types';
import GraphEditForm from '../forms/GraphEditForm';
import GraphCreator from '../builder/graph-creator';
import { GraphMetaData, Graph } from '../../redux/graphbuilder/types';
import { GraphConfiguration } from '../builder/types';

exporting(Highcharts);
drilldown(Highcharts);

/*
 * Renders an individual Graph with the toolbar.
 * This component contains two main parts:
 *  1. The graph toolbar
 *  2. The graph itself
 */
function GraphPrebuilt({ graph, index }: GraphPrebuiltProps) {
  const classes = useGraphStyles();
  const graphCreator = new GraphCreator();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [graphDim, setGraphDim] = useState([undefined, undefined]);

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
      <GraphCardActions>
        <GraphToolbar graph={graph} category="" graphSVG="" index={index} />
      </GraphCardActions>
      <GraphDivider light />
      {graph.isHidden ? (
        <CardContent>
          <Typography color="primary" variant="subtitle1" align="center">
            {graph.graphMetaData.graphTitle}
          </Typography>
        </CardContent>
      ) : null}
      <Collapse in={!graph.isHidden} timeout="auto" unmountOnExit>
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
      </Collapse>
      <Collapse in={graph.isEditing} timeout="auto" unmountOnExit>
        <FormCardContent>
          <GraphEditForm graph={graph} index={index} />
        </FormCardContent>
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
