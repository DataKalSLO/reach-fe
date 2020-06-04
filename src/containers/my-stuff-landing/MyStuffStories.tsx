import React, { useEffect } from 'react';
import { getPublishedStoriesAndHandleResponse } from '../../api/stories/operationHandlers';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import StoryCard from '../../preview-cards/story-card/StoryCard';
import { Story } from '../../redux/story/types';

export default function MyStuffStories() {
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

  return <MyStuffWrapper title="My Stories">{makeStoryCards()}</MyStuffWrapper>;
}
