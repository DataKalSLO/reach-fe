import { Container } from '@material-ui/core';
import React from 'react';
import StoryBuilderForm from '../stories/StoryBuilderForm';

function StoryBuilder() {
  return (
    <Container>
      <h1>StoryBuilder</h1>
      <StoryBuilderForm />
    </Container>
  );
}

export default StoryBuilder;
