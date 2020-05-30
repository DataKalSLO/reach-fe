import React, { useEffect } from 'react';
import { getPublishedStoriesAndHandleResponse } from '../api/stories/operationHandlers';
import Gallery from '../common/components/Gallery';
import StoryCard from '../preview-cards/story-card/StoryCard';
import { Story } from '../redux/story/types';

export default function ExploreGrid() {
  const [stories, setStories] = React.useState([] as Story[]);

  useEffect(() => {
    getPublishedStoriesAndHandleResponse().then(storydata => {
      if (storydata) {
        setStories(storydata);
      }
    });
  });

  const makeStoryCards = () => {
    return stories.map((storyInfo: Story) => {
      return <StoryCard key={storyInfo.id} story={storyInfo} />;
    });
  };

  const StoryCardGallery = () => {
    const storyCards = makeStoryCards();
    return <Gallery>{storyCards}</Gallery>;
  };
  return <StoryCardGallery />;
}
