import { Grid, Paper, styled } from '@material-ui/core';
import React from 'react';
import { useGraphs } from '../../graphs/components/Accessor';
import GraphCard from '../../preview-cards/GraphCard';
import { Gallery } from '../../reach-ui/core';

export default function GraphBlock() {
  const graphs = useGraphs();

  return (
    <StoryBlockContainer variant="outlined">
      <Gallery>
        {graphs.map((graph, index) => (
          <Grid item key={index} xs={12} sm={4}>
            <GraphCard
              key={index}
              index={index}
              content={graph}
              onClick={() => {
                alert(
                  'You can not select a graph to add to your story at this time.'
                );
              }}
            />
          </Grid>
        ))}
      </Gallery>
    </StoryBlockContainer>
  );
}

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  padding: '20px',
  margin: '10px 0px 10px 0px'
});
