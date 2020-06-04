import Alert from '@material-ui/lab/Alert';
import React, { useEffect } from 'react';
import { getStoryFeedback } from '../api/stories/operationHandlers';
import { StoryFeedback } from '../api/stories/types';
import { User } from '../redux/login/types';
import { Story } from '../redux/story/types';

interface Props {
  story: Story;
  user: User;
}

export default function AdminReviewFeedback(props: Props) {
  const [feedback, setFeedback] = React.useState([] as StoryFeedback[]);

  useEffect(() => {
    getStoryFeedback(props.story.id).then(feedbackData => {
      if (feedback !== undefined) {
        setFeedback(feedbackData);
      }
    });
  }, [props.story.id, feedback]);

  if (feedback.length > 0 && props.story.userID === props.user.email) {
    return (
      <Alert severity="info">
        Your story has not been approved for publishing. An admin shared the
        following feedback: <br /> {feedback[0].feedback}
      </Alert>
    );
  } else {
    return <React.Fragment />;
  }
}
