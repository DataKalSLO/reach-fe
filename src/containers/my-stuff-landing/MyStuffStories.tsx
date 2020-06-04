import React, { useEffect } from 'react';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import { getPublishedStoriesAndHandleResponse } from '../../api/stories/operationHandlers';
import { Story } from '../../redux/story/types';
import { Gallery } from '../../reach-ui/core';
import StoryCard from '../../preview-cards/story-card/StoryCard';

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

export default function MyStuffStories() {
  return <MyStuffWrapper title="My Stories">{makeStoryCards()}</MyStuffWrapper>;
}
