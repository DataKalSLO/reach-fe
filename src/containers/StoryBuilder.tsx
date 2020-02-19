import { Container } from '@material-ui/core';
import React from 'react';
import StoryBuilderForm from '../stories/StoryBuilderForm';

function StoryBuilder() {
  return (
    <Container>
      <h1>StoryBuilder</h1>
      <p>
        Tell us a compelling story using data. Use the toolbar on the right to
        add text blocks, graphs, static images, and dataset snippets to help
        readers follow along with your findings and conclusions. Use the drag
        handles to the left of each component if you want to reorder them.
      </p>
      <StoryBuilderForm />
    </Container>
  );
}

export default StoryBuilder;
