import React, { useEffect } from 'react';
import StoryCard from '../../../preview-cards/story-card/StoryCard';
import { getAllStoriesAndHandleResponse } from '../../../api/stories/operationHandlers';
import { Story } from '../../../redux/story/types';
import Gallery from '../../../common/components/Gallery';

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
