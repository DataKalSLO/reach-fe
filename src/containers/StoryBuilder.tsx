import { Container } from '@material-ui/core';
import React from 'react';
import RichTextEditor from '../stories/RichTextEditor';
import StoryBuilderForm from '../stories/StoryBuilderForm';

function StoryBuilder() {
  return (
    <Container>
      <h1>TODO: StoryBuilder</h1>
      <RichTextEditor />
      <StoryBuilderForm />
    </Container>
  );
}

export default StoryBuilder;
