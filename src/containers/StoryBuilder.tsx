import { Box } from '@material-ui/core';
import React from 'react';
import { SidebarContentBox } from '../reach-ui/core';
import StoryEditor from '../stories/StoryEditor';
import StorySidebar from '../stories/StorySidebar';

export default function StoryBuilder() {
  return (
    <Box display="flex">
      <StorySidebar />
      <SidebarContentBox>
        <StoryEditor />
      </SidebarContentBox>
    </Box>
  );
}
