import { Box, Container } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import React from 'react';
import StoryForm from '../stories/StoryForm';
import { StoryToolbar, STORY_TOOLBAR_WIDTH } from '../stories/StoryToolbar';

export default function StoryBuilder() {
  return (
    <Container>
      <StoryFormContainer>
        <StoryForm />
      </StoryFormContainer>
      <StoryToolbar />
    </Container>
  );
}

const StoryFormContainer = styled(Box)({
  marginRight: STORY_TOOLBAR_WIDTH
});
