import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getStoryWithStoryID } from '../api/stories/operations';
import { UNAUTHORIZED_OPERATION_ERROR } from '../api/authenticatedApi/constants';

import { EXPLORE } from '../nav/constants';
import { ContentBox } from '../reach-ui/core';
import { Story } from '../redux/story/types';
import StoryView from '../stories/StoryView';

function StoryViewContainer() {
  const { storyId } = useParams();
  const history = useHistory();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    const navigateToExplore = () => history.push(EXPLORE);
    if (!storyId) {
      navigateToExplore();
      return;
    }
    getStoryWithStoryID(storyId)
      .then((data: Story) => {
        setStory(data);
      })
      .catch(error => {
        //Ignore unresolvable TypeError that is thrown on refresh, no effect on query result.
        if (
          !(error instanceof TypeError) &&
          !(error.name === UNAUTHORIZED_OPERATION_ERROR) //error is thrown when token not present
        ) {
          alert(error);
          navigateToExplore();
        }
      });
  }, [storyId, history]);

  if (story) {
    return (
      <ContentBox>
        <StoryView story={story} />
      </ContentBox>
    );
  } else {
    return <React.Fragment />;
  }
}

export default StoryViewContainer;
