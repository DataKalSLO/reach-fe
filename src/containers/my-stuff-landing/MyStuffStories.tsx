import React, { useEffect } from 'react';
import { getStoriesWithUserId } from '../../api/stories/operations';
import { setTab } from '../../common/components/PersistentDrawer';
import { STORIES_TAB_TITLE } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import StoryCard from '../../preview-cards/story-card/StoryCard';
import { MY_STUFF_SIDEBAR } from '../../reach-ui/constants';
import { Story } from '../../redux/story/types';

export default function MyStuffStories() {
  const [stories, setStories] = React.useState([] as Story[]);

  // ensures correct tab is selected in the MyStuffSidebar
  setTab(MY_STUFF_SIDEBAR, STORIES_TAB_TITLE);

  useEffect(() => {
    getStoriesWithUserId().then(storyData => {
      setStories(storyData);
    });
  }, []);

  const makeStoryCards = () =>
    stories.map((story: Story) => (
      <StoryCard key={story.id} showAuthorActions={true} story={story} />
    ));

  return (
    <MyStuffWrapper
      title="My Stories"
      emptyStateMessage={
        "You haven't written any stories yet. Write your first one using the StoryBuilder!"
      }
    >
      {makeStoryCards()}
    </MyStuffWrapper>
  );
}
