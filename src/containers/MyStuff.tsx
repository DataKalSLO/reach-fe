import React from 'react';
import StoryCard from '../stories/StoryCard';
import { Story } from '../redux/story/types';

export const initialStory: Story = {
  id: '12345',
  userID: 'USER-ID', // TODO: replace placeholder value
  title: 'My Title',
  description: 'Filler Description',
  storyBlocks: []
};

function MyStuff() {
  return (
    <div>
      <StoryCard story={initialStory} />
    </div>
  );
}

export default MyStuff;
