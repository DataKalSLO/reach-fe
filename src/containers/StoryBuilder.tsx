import { Box, Container } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import React, { useState } from 'react';
import StoryForm from '../stories/StoryForm';
import { StoryToolbar, STORY_TOOLBAR_WIDTH } from '../stories/StoryToolbar';

export default function StoryBuilder() {
  const [previewSelected, setPreviewSelected] = useState(false);

  function togglePreview() {
    setPreviewSelected(!previewSelected);
  }

  return (
    <Container>
      <StoryFormContainer>
        <StoryForm
          previewSelected={previewSelected}
          togglePreview={togglePreview}
        />
      </StoryFormContainer>
      <StoryToolbar togglePreview={togglePreview} />
    </Container>
  );
}

const halfToolbarWidth = STORY_TOOLBAR_WIDTH / 1.5;

const StoryFormContainer = styled(Box)({
  marginLeft: halfToolbarWidth
});
