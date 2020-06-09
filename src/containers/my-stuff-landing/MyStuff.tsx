import React from 'react';
import { setTab } from '../../common/components/PersistentDrawer';
import { ALL_ITEMS_TAB_TITLE } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import { DEFAULT_USER_NAME } from '../../nav/constants';
import StoryCard from '../../preview-cards/story-card/StoryCard';
import { MY_STUFF_SIDEBAR } from '../../reach-ui/constants';
import { PublicationStatus, Story } from '../../redux/story/types';

const sampleDate = new Date('Fri May 29 2020');

const sampleStoryDraft: Story = {
  id: '12345',
  publicationStatus: PublicationStatus.DRAFT,
  userName: DEFAULT_USER_NAME,
  userId: 'USER-ID', // TODO: replace placeholder value
  title: 'High School Graduation Rates on the Central Coast',
  description:
    "High school graduation rates are a critical metric of the effectiveness of our local high schools, as well as our students' college preparedness.",
  storyBlocks: [],
  dateCreated: sampleDate,
  dateLastEdited: sampleDate
};

const sampleStoryInReview: Story = {
  id: '12345',
  publicationStatus: PublicationStatus.REVIEW,
  userName: DEFAULT_USER_NAME,
  userId: 'USER-ID', // TODO: replace placeholder value
  title: 'Zoning in Downtown San Luis Obispo',
  description:
    'Are the zoning policies in downtown SLO preventing business expansion?',
  storyBlocks: [],
  dateCreated: sampleDate,
  dateLastEdited: sampleDate
};

const sampleStoryPublished: Story = {
  id: '12345',
  publicationStatus: PublicationStatus.PUBLISHED,
  userName: DEFAULT_USER_NAME,
  userId: 'USER-ID', // TODO: replace placeholder value
  title: 'Published Story',
  description: 'Fake published story. Local and hard-coded.',
  storyBlocks: [],
  dateCreated: sampleDate,
  dateLastEdited: sampleDate
};

export default function MyStuff() {
  // ensures correct tab is selected in the MyStuffSidebar
  setTab(MY_STUFF_SIDEBAR, ALL_ITEMS_TAB_TITLE);

  return (
    <MyStuffWrapper
      title="My Stuff"
      emptyStateMessage={
        "You don't have any saved graphs or stories yet. Check out the Explore page for inspiration, and then make your first ones using the VizBuilder and StoryBuilder."
      }
    >
      {/* TODO: replace this with the content for the gallery view */}
      <StoryCard story={sampleStoryDraft} />
      <StoryCard story={sampleStoryInReview} />
      <StoryCard story={sampleStoryPublished} />
    </MyStuffWrapper>
  );
}
