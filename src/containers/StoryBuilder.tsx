import { Box, Container } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import React from 'react';
import StoryForm from '../stories/StoryForm';
import { StoryToolbar, STORY_TOOLBAR_WIDTH } from '../stories/StoryToolbar';

export default function StoryBuilder() {
  return (
    <Container>
      <StoryToolbar />
      <StoryFormContainer>
        <StoryForm />
      </StoryFormContainer>
    </Container>
  );
}

const StoryFormContainer = styled(Box)({
  marginLeft: STORY_TOOLBAR_WIDTH
});
