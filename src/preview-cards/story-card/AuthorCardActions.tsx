import { CardActions, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import { deleteStoryById } from '../../api/stories/operations';
import { STORY_BUILDER } from '../../nav/constants';
import { IconButton } from '../../reach-ui/core';
import { DELETE_ICON, EDIT_ICON } from '../../reach-ui/icons';
import { loadExistingStory } from '../../redux/story/actions';
import { PublicationStatus, Story } from '../../redux/story/types';
import StoryStatusMenu from './StoryStatusMenu';

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
}

export default function AuthorCardActions(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const EditButton = (props: { story: Story; dispatch: Dispatch }) => {
    // Story cannot be edited while pending review or already published
    const isDisabled =
      props.story.publicationStatus === PublicationStatus.PUBLISHED ||
      props.story.publicationStatus === PublicationStatus.REVIEW;

    const goToEditStory = () => {
      props.dispatch(loadExistingStory(props.story));
      history.push(STORY_BUILDER);
    };

    return (
      <IconButton
        icon={EDIT_ICON}
        size="small"
        aria-label="edit"
        disabled={isDisabled}
        onClick={goToEditStory}
      />
    );
  };

  const DeleteButton = (props: { story: Story; dispatch: Dispatch }) => {
    const isDisabled =
      props.story.publicationStatus === PublicationStatus.PUBLISHED;

    const confirmDelete = () => {
      if (
        window.confirm(
          'Are you sure you wish to delete this story? This action cannot be undone.'
        )
      )
        deleteStoryById(props.story.id);
    };

    // TODO: figure out how to make it red
    return (
      <IconButton
        icon={DELETE_ICON}
        size="small"
        aria-label="delete"
        disabled={isDisabled}
        onClick={confirmDelete}
      />
    );
  };

  return (
    <CardActions className={classes.actions}>
      <StoryStatusMenu story={props.story} />
      <EditButton story={props.story} dispatch={dispatch} />
      <DeleteButton story={props.story} dispatch={dispatch} />
    </CardActions>
  );
}
