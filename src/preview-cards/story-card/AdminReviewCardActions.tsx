import { CardActions, makeStyles } from '@material-ui/core';
import { AssignmentTurnedIn, Feedback } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../reach-ui/core';
import { updatePublicationStatus } from '../../redux/story/actions';
import { PublicationStatus } from '../../redux/story/types';
import { theme } from '../../theme/theme';

const useStyles = makeStyles({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0
  }
});

// action buttons to appear on the story card when the user is
// an admin and the story is pending review for publication
const AdminReviewCardActions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const publishStory = () => {
    dispatch(updatePublicationStatus(PublicationStatus.PUBLISHED));
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
};

export { AdminReviewCardActions };
