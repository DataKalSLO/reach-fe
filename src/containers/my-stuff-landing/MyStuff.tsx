import React from 'react';
import { SidebarListOrder } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import StoryCard from '../../common/components/StoryCard';
import { Story, PublicationStatus } from '../../redux/story/types';
import Gallery from '../../common/components/Gallery';

const sampleStory: Story = {
  id: '12345',
  publicationStatus: PublicationStatus.DRAFT,
  userID: 'USER-ID', // TODO: replace placeholder value
  title: 'High School Graduation Rates on the Central Coast',
  description:
    "High school graduation rates are a critical metric of the effectiveness of our local high schools, as well as our students' college preparedness.",
  storyBlocks: []
};

export default function MyStuff() {
  return (
    <MyStuffWrapper title="My Stuff" selectedIndex={SidebarListOrder.all}>
      {/* TODO: replace this with the content for the gallery view */}
      <StoryCard story={sampleStory} />
    </MyStuffWrapper>
  );
}
