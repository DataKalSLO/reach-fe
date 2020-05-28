import React, { useEffect } from 'react';
import { getAllStoriesAndHandleResponse } from '../../../api/stories/operationHandlers';
import Gallery from '../../../common/components/Gallery';
import StoryCard from '../../../preview-cards/story-card/StoryCard';
import { Story } from '../../../redux/story/types';

export default function StoryGrid() {
  const [stories, setStories] = React.useState([] as Story[]);

  useEffect(() => {
    getAllStoriesAndHandleResponse().then(storydata => {
      if (storydata) {
        setStories(storydata);
      }
    });
  });

  const makeStories = () => {
    return stories.map((storyInfo: Story) => {
      return <StoryCard key={storyInfo.id} story={storyInfo} />;
    });
  };

  const DisplayStories = () => {
    const storyCards = makeStories();
    return <Gallery>{storyCards}</Gallery>;
  };
  return <DisplayStories />;
}
