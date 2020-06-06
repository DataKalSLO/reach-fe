import React from 'react';
import { setTab } from '../../common/components/PersistentDrawer';
import { ALL_ITEMS_TAB_TITLE } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import { MY_STUFF_SIDEBAR } from '../../reach-ui/constants';

export default function MyStuff() {
  // ensures correct tab is selected in the MyStuffSidebar
  setTab(MY_STUFF_SIDEBAR, ALL_ITEMS_TAB_TITLE);

  return (
    <MyStuffWrapper
      title="My Stuff"
      emptyStateMessage={
        "You don't have any saved graphs or stories yet. Check out the Explore page for inspiration, and then make your first ones using the VizBuilder and StoryBuilder."
      }
    ></MyStuffWrapper>
  );
}
