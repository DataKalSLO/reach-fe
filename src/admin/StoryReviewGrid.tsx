import React, { useEffect } from 'react';
import { getStoriesInReview } from '../api/stories/operations';
import { setTab } from '../common/components/PersistentDrawer';
import StoryCard from '../preview-cards/story-card/StoryCard';
import { ADMIN_SIDEBAR } from '../reach-ui/constants';
import { Gallery } from '../reach-ui/core';
import { Story } from '../redux/story/types';
import { REVIEW_STORIES_TAB_TITLE } from './AdminSidebar';
import AdminWrapper from './AdminWrapper';

export default function StoryReviewGrid() {
  const [stories, setStories] = React.useState([] as Story[]);

  // ensures correct tab is selected in the AdminSidebar
  setTab(ADMIN_SIDEBAR, REVIEW_STORIES_TAB_TITLE);

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
