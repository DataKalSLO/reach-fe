import React, { useEffect } from 'react';
import { getPublishedStoriesAndHandleResponse } from '../api/stories/operationHandlers';
import { Gallery } from '../reach-ui/core.js';
import StoryCard from '../preview-cards/story-card/StoryCard';
import { Story } from '../redux/story/types';

export default function ExploreGrid() {
  const [stories, setStories] = React.useState([] as Story[]);

  useEffect(() => {
    getPublishedStoriesAndHandleResponse().then(apiResponse =>
      apiResponse ? setStories(apiResponse) : null
    );
  }, []);

  const makeStoryCards = () => {
    return stories.map((storyInfo: Story) => {
      return <StoryCard key={storyInfo.id} story={storyInfo} />;
    });
  };

  const StoryCardGallery = () => {
    const storyCards = makeStoryCards();
    return (
      <Gallery emptyStateMessage="It doesn't look like any stories have been published yet. Be the first by creating a story in the StoryBuilder!">
        {storyCards}
      </Gallery>
    );
  };
  return <StoryCardGallery />;
}
