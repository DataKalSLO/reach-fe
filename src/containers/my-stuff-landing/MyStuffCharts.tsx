import React from 'react';
import { SidebarListOrder } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';

export default function MyStuffCharts() {
  return (
    <MyStuffWrapper title="My Charts" selectedIndex={SidebarListOrder.charts}>
      {/* TODO: replace this with the content for the gallery view */}
      <React.Fragment />
    </MyStuffWrapper>
  );
}
