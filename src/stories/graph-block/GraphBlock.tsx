import { Box, Grid, styled } from '@material-ui/core';
import React from 'react';
import { useGraphs } from '../../graphs/components/Accessor';
import GraphCard from '../../preview-cards/GraphCard';
import { Gallery } from '../../reach-ui/core';
import { BORDER } from '../../theme/theme';

export const GRAPH_NOT_SELECTED = '';

interface Props {
  graphID: string;
  setGraphId: (graphID: string) => void;
}

export default function GraphBlock(props: Props) {
  const { graphID, setGraphId } = props;
  const graphs = useGraphs();

  const GraphExplorer = () => (
    <Gallery>
      {graphs.map((graph, index) => (
        <Grid item key={index} xs={12} sm={4}>
          <GraphCard
            key={index}
            index={index}
            content={graph}
            onClick={() => setGraphId((index as unknown) as string)}
          />
        </Grid>
      ))}
    </Gallery>
  );

  const SelectedGraph = () => (
    <div>{graphs[(graphID as unknown) as number]}</div>
  );

  return (
    <StoryBlockContainer>
      {graphID === GRAPH_NOT_SELECTED ? <GraphExplorer /> : <SelectedGraph />}
    </StoryBlockContainer>
  );
}

const StoryBlockContainer = styled(Box)({
  flexGrow: 1,
  padding: '20px',
  margin: '10px 0px 10px 0px',
  border: BORDER,
  borderRadius: '5px'
});
