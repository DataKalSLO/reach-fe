import { Box, styled } from '@material-ui/core';
import { AssignmentTurnedIn, Feedback } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADMIN_USER } from '../nav/constants';
import { Button, TextField } from '../reach-ui/core';
import { User } from '../redux/login/types';
import { updatePublicationStatus } from '../redux/story/actions';
import { PublicationStatus, Story } from '../redux/story/types';
import { theme } from '../theme/theme';

interface Props {
  story: Story;
  user: User;
}
export default function AdminReviewActions(props: Props) {
  const dispatch = useDispatch();
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);

  const publishStory = () => {
    dispatch(updatePublicationStatus(PublicationStatus.PUBLISHED));
  };

  let feedbackInput: {} | undefined;
  if (showFeedbackInput) {
    feedbackInput = (
      <>
        <TextField
          autoFocus
          required
          margin="dense"
          fullWidth
          multiline
          label="Feedback"
        />
        <FlexEndBox flexDirection="row" alignContent="flex-end">
          <Button
            label="Cancel"
            onClick={() => setShowFeedbackInput(false)}
            style={{ backgroundColor: 'lightgray' }}
          />
          <Button
            label="Submit Feedback"
            onClick={() => alert('not implemented')}
            edge="end"
          />
        </FlexEndBox>
      </>
    );
  }

  let reviewButtons: {} | undefined;
  if (!showFeedbackInput) {
    reviewButtons = (
      <FlexEndBox>
        <Button
          startIcon={<Feedback />}
          label="Reject with Feedback"
          onClick={() => setShowFeedbackInput(true)}
          style={{ backgroundColor: theme.palette.error.light }}
        />
        <Button
          startIcon={<AssignmentTurnedIn />}
          label="Approve & Publish"
          edge="end"
          onClick={publishStory}
        />
      </FlexEndBox>
    );
  }

  if (
    props.user.role === ADMIN_USER &&
    props.story.publicationStatus === PublicationStatus.REVIEW
  ) {
    return (
      <PaddedBox>
        {/* The review buttons will show by default. When the "Reject with Feedback" button is clicked,
        the buttons will be hidden and the feedback input UI will take its place. */}
        {reviewButtons}
        {feedbackInput}
      </PaddedBox>
    );
  } else {
    return <React.Fragment />;
  }
}

const FlexEndBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
});

const PaddedBox = styled(Box)({
  paddingTop: theme.spacing(4)
});
