import React from 'react';
import { setTab } from '../../common/components/PersistentDrawer';
import { STORIES_TAB_TITLE } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import { MY_STUFF_SIDEBAR } from '../../reach-ui/constants';

export default function MyStuffStories() {
  // ensures correct tab is selected in the MyStuffSidebar
  setTab(MY_STUFF_SIDEBAR, STORIES_TAB_TITLE);

  return (
    <MyStuffWrapper title="My Stories">
      {/* TODO: replace this with the content for the gallery view */}
      <React.Fragment />
    </MyStuffWrapper>
  );
}
