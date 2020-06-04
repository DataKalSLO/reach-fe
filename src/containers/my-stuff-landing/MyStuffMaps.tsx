import React from 'react';
import { setTab } from '../../common/components/PersistentDrawer';
import { MAPS_TAB_TITLE } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import { MY_STUFF_SIDEBAR } from '../../reach-ui/constants';

export default function MyStuffMaps() {
  // ensures correct tab is selected in the MyStuffSidebar
  setTab(MY_STUFF_SIDEBAR, MAPS_TAB_TITLE);

  return (
    <MyStuffWrapper title="My Maps">
      {/* TODO: replace this with the content for the gallery view */}
      <React.Fragment />
    </MyStuffWrapper>
  );
}
