import { Container } from '@material-ui/core';
import React from 'react';
import StoryForm from '../stories/StoryForm';

function StoryBuilder() {
  return (
    <Container>
      <h1>StoryBuilder</h1>
      <text>
        Tell us a compelling story using data. Use the toolbar on the right to
        add text blocks, graphs, static images, and dataset snippets to help
        readers follow along with your findings and conclusions. Use the drag
        handles to the left of each component if you want to reorder them.
      </p>
      <StoryForm />
    </Container>
  );
}

export default StoryBuilder;
