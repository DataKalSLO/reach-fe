import React, { useEffect } from 'react';
import { getStoriesInDraft } from '../../api/stories/operations';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import StoryCard from '../../preview-cards/story-card/StoryCard';
import { Story } from '../../redux/story/types';

export default function MyStuffStories() {
  const [stories, setStories] = React.useState([] as Story[]);

  useEffect(() => {
    // TODO: need an API call to retrieve all stories by userId
    // (i.e. stories in REVIEW, PUBLISHED, DRAFT and FEEDBACK)
    getStoriesInDraft().then(storyData => {
      console.log(storyData);
      setStories(storyData);
    });
  }, []);

  const makeStoryCards = () => {
    return stories.map((storyInfo: Story) => {
      return <StoryCard key={storyInfo.id} story={storyInfo} />;
    });
  };

  return <MyStuffWrapper title="My Stories">{makeStoryCards()}</MyStuffWrapper>;
}
