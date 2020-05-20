import React from 'react';
import { SidebarListOrder } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';

export default function MyStuff() {
  return (
    <MyStuffWrapper title="My Stuff" selectedIndex={SidebarListOrder.all}>
      {/* TODO: replace this with the content for the gallery view */}
      <React.Fragment />
    </MyStuffWrapper>
  );
}
