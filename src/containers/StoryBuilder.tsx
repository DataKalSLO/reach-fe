import { Box, Container } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import React from 'react';
import StoryForm from '../stories/StoryForm';
import StorySidebar, { STORY_TOOLBAR_WIDTH } from '../stories/StorySidebar';

export default function StoryBuilder() {
  return (
    <Container>
      <StorySidebar />
      <StoryFormContainer>
        <StoryForm />
      </StoryFormContainer>
    </Container>
  );
}

const StoryFormContainer = styled(Box)({
  marginLeft: STORY_TOOLBAR_WIDTH
});
