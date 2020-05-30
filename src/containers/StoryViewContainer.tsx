import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getStoryWithStoryID } from '../api/stories/operations';
import { Story } from '../redux/story/types';
import StoryView from '../stories/StoryView';
import { styled, Box } from '@material-ui/core';
import { theme } from '../theme/theme';

function StoryViewContainer() {
  const { storyId } = useParams();
  const history = useHistory();
  const [story, setStory] = useState<Story | null>(null);

  const navigateToExplore = () => history.push('/explore');

  useEffect(() => {
    if (!storyId) {
      navigateToExplore();
      return;
    }
    getStoryWithStoryID(storyId)
      .then((data: Story) => {
        setStory(data);
      })
      .catch(error => {
        alert(error);
        navigateToExplore();
      });
  });

  // Put story preview component somewhere in here
  return story ? (
    <ContentBox>
      <StoryView story={story} />
    </ContentBox>
  ) : (
    <React.Fragment />
  );
}

const ContentBox = styled(Box)({
  flexGrow: 1,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(12),
  paddingRight: theme.spacing(12)
});

export default StoryViewContainer;
