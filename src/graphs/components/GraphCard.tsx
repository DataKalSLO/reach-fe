import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  styled,
  Typography
} from '@material-ui/core';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useRef, useState } from 'react';
import { isNullOrUndefined } from 'util';
import { CHART_HEIGHT_PERCENT, CHART_WIDTH_SCALE } from './constants';
import { CoreGraph } from './CoreGraph';
import GraphToolbar from './GraphToolbar';
import { useGraphStyles } from './styles';
import { GraphPrebuiltProps } from './types';

export function GraphCard({ graph, index }: GraphPrebuiltProps) {
  const classes = useGraphStyles();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [graphSVG, setGraphSVG] = useState<string>('');
  const [expanded, setExpanded] = useState(false);
  const [isHidden, setHidden] = useState(false);
  const highchartsRef = useRef<HighchartsReact>(null);

  /*
   * Get the chart SVG
   */
  useEffect(() => {
    if (!isNullOrUndefined(highchartsRef.current)) {
      setGraphSVG(highchartsRef.current?.chart.getSVG());
    }
  }, []);

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
    setHidden(false);
  }, [graph]);

  const toggleEdit = () => {
    setExpanded(!expanded);
  };

  const toggleHide = () => {
    setHidden(!isHidden);
  };

  return (
    <Card variant="outlined">
      <GraphCardActions>
        <GraphToolbar
          graph={graph}
          index={index}
          graphSVG={graphSVG}
          isHidden={isHidden}
          toggleEdit={toggleEdit}
          toggleHide={toggleHide}
        />
      </GraphCardActions>
      <GraphDivider light />
      {isHidden ? (
        <CardContent>
          <GraphTitle color="primary" variant="subtitle1" align="center">
            {graph.graphMetaData.graphTitle}
          </GraphTitle>
        </CardContent>
      ) : null}
      <Collapse in={!isHidden} timeout="auto" unmountOnExit>
        <CardContent>
          <CoreGraph
            graph={graph}
            width={windowWidth * CHART_WIDTH_SCALE}
            height={CHART_HEIGHT_PERCENT}
            containerProps={{ className: classes.highcharts }}
            ref={highchartsRef}
          />
        </CardContent>
      </Collapse>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <FormCardContent></FormCardContent>
      </Collapse>
    </Card>
  );
}

const GraphCardActions = styled(CardActions)({
  padding: '0px'
});

const GraphDivider = styled(Divider)({
  marginBottom: '10px'
});

const FormCardContent = styled(CardContent)({
  padding: '0px'
});

const GraphTitle = styled(Typography)({
  margin: '0px 40px 0px 40px'
});
