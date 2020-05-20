import React from 'react';
import { SidebarListOrder } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';

export default function MyStuffStories() {
  return (
    <MyStuffWrapper title="My Stories" selectedIndex={SidebarListOrder.stories}>
      {/* TODO: replace this with the content for the gallery view */}
      <React.Fragment />
    </MyStuffWrapper>
  );
}
