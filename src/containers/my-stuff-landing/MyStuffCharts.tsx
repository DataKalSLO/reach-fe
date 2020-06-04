import React from 'react';
import { setTab } from '../../common/components/PersistentDrawer';
import { CHARTS_TAB_TITLE } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';

export default function MyStuffCharts() {
  // ensures correct tab is selected in the MyStuffSidebar
  setTab(MY_STUFF_SIDEBAR, CHARTS_TAB_TITLE);

  return (
    <MyStuffWrapper title="My Charts">
      {/* TODO: replace this with the content for the gallery view */}
      <React.Fragment />
    </MyStuffWrapper>
  );
}
