import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import { getStoryWithStoryID } from '../api/stories/operations';
import { Story } from '../redux/story/types';
//import ShareButton from '../common/components/ShareButton';

function StoryView() {
  const { storyId } = useParams();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    console.log(storyId);
    if (!storyId) {
      // do something when there isn't a story id, e.g. /stories or make param required
      return;
    }
    getStoryWithStoryID(storyId).then((data: Story) => {
      setStory(data);
    });
  });

  // Put story preview component somewhere in here
  return <Box>{story ? story.title : ''}</Box>;
}

export default StoryView;
