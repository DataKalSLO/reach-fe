import React, { useEffect } from 'react';
import { getStoriesInReview } from '../api/stories/operations';
import StoryCard from '../preview-cards/story-card/StoryCard';
import { Gallery } from '../reach-ui/core';
import { Story } from '../redux/story/types';
import AdminWrapper from './AdminWrapper';

export default function StoryReviewGrid() {
  const [stories, setStories] = React.useState([] as Story[]);

  useEffect(() => {
    getStoriesInReview().then(storyData => setStories(storyData));
  }, []);

  const makeStoryCards = () => {
    return stories.map((storyInfo: Story) => {
      return <StoryCard key={storyInfo.id} story={storyInfo} />;
    });
  };

  return (
    <AdminWrapper title="Review Stories">
      <Gallery>{makeStoryCards()}</Gallery>
    </AdminWrapper>
  );
}
