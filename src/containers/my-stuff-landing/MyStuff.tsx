import React from 'react';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import StoryCard from '../../preview-cards/story-card/StoryCard';
import { PublicationStatus, Story } from '../../redux/story/types';

const sampleDate = new Date('Fri May 29 2020');

const sampleStoryDraft: Story = {
  id: '12345',
  publicationStatus: PublicationStatus.DRAFT,
  userID: 'USER-ID', // TODO: replace placeholder value
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
  userID: 'USER-ID', // TODO: replace placeholder value
  title: 'Zoning in Downtown San Luis Obispo',
  description:
    'Are the zoning policies in downtown SLO preventing business expansion?',
  storyBlocks: [],
  dateCreated: sampleDate,
  dateLastEdited: sampleDate
};

export default function MyStuff() {
  return (
    <MyStuffWrapper title="My Stuff">
      {/* TODO: replace this with the content for the gallery view */}
      <StoryCard story={sampleStoryDraft} />
      <StoryCard story={sampleStoryInReview} />
    </MyStuffWrapper>
  );
}
