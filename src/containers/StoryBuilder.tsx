import { Box } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { SidebarContentBox, Snackbar } from '../reach-ui/core';
import { getNotifications } from '../redux/notifications/selector';
import StoryEditor from '../stories/StoryEditor';
import StorySidebar from '../stories/StorySidebar';

export default function StoryBuilder() {
  const notificationsState = useSelector(getNotifications);

  return (
    <Box display="flex">
      <Snackbar
        actionId={notificationsState.actionStatus.actionId}
        severity={notificationsState.actionStatus.severity}
        open={notificationsState.actionStatus.show}
        message={notificationsState.actionStatus.message}
      />
      <StorySidebar />
      <SidebarContentBox>
        <StoryEditor />
      </SidebarContentBox>
    </Box>
  );
}
