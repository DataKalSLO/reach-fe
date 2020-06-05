import { CardActions, makeStyles } from '@material-ui/core';
import { AssignmentTurnedIn, Feedback } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../reach-ui/core';
import { updatePublicationStatus } from '../../redux/story/actions';
import { PublicationStatus, Story } from '../../redux/story/types';
import { theme } from '../../theme/theme';
import { submitStoryForPublishingAndHandleResponse } from '../../api/stories/operationHandlers';

const useStyles = makeStyles({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0
  }
});

interface Props {
  story: Story;
  setCardVisible: (isVisible: boolean) => void;
}

// action buttons to appear on the story card when the user is
// an admin and the story is pending review for publication
export default function AdminReviewCardActions(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const publishStory = () => {
    if (submitStoryForPublishingAndHandleResponse(props.story)) {
      dispatch(updatePublicationStatus(PublicationStatus.PUBLISHED));
      props.setCardVisible(false);
    }
  };

  return (
    <CardActions className={classes.actions}>
      <Button
        label="Reject"
        startIcon={<Feedback />}
        variant="text"
        style={{ color: theme.palette.error.main }}
        onClick={() => alert('not yet implemented')}
      />
      <Button
        label="Publish"
        startIcon={<AssignmentTurnedIn />}
        variant="text"
        onClick={publishStory}
      />
    </CardActions>
  );
}
