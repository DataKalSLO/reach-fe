import React, { useEffect } from 'react';
import { getPublishedStories } from '../api/stories/operations';
import Gallery from '../common/components/Gallery';
import StoryCard from '../preview-cards/story-card/StoryCard';
import { Story } from '../redux/story/types';

export default function ExploreGrid() {
  const [stories, setStories] = React.useState([] as Story[]);

  useEffect(() => {
    getPublishedStories().then(storydata => {
      setStories(storydata);
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
