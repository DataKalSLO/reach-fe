import React from 'react';
import { SidebarListOrder } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';

export default function MyStuffMaps() {
  return (
    <MyStuffWrapper title="My Maps" selectedIndex={SidebarListOrder.maps}>
      {/* TODO: replace this with the content for the gallery view */}
      <React.Fragment />
    </MyStuffWrapper>
  );
}
