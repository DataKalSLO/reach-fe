import { Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import React from 'react';
import StoryEditor from '../stories/StoryEditor';
import StorySidebar from '../stories/StorySidebar';
import { theme } from '../theme/theme';

export default function StoryBuilder() {
  return (
    <StyledBox>
      <StorySidebar />
      <StoryFormBox>
        <StoryEditor />
      </StoryFormBox>
    </StyledBox>
  );
}

const StyledBox = styled(Box)({
  display: 'flex'
});

const StoryFormBox = styled(Box)({
  flexGrow: 1,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(12),
  paddingRight: theme.spacing(12)
});
