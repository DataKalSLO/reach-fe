import { Grid, Paper, styled } from '@material-ui/core';
import React from 'react';
import Gallery from '../common/components/Gallery';
import { useGraphs } from '../graphs/components/Accessor';
import { GalleryPreviewCard } from './GalleryPreviewCard';

export default function GraphBlock() {
  const graphs = useGraphs();

  return (
    <StoryBlockContainer variant="outlined">
      <Gallery>
        {graphs.map((graph, index) => (
          <Grid item key={index} xs={12} sm={4}>
            <GalleryPreviewCard
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
