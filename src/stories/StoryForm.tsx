import { Button, Typography, styled } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTextBlock } from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import SortableList from '../stories/SortableList';

export default function StoryForm() {
  const dispatch = useDispatch();
  const story = useSelector(getStory);

  function saveStory() {
    alert(JSON.stringify(story.storyBlocks, null, 2));
    console.log(JSON.stringify(story));
    return story;
  }

  return (
    <div>
      {/* TODO: @tan */}
      <Typography variant="h3">{story.title}</Typography>
      {/* TODO: @kev */}
      <Typography variant="h5">{story.description}</Typography>
      <SortableList storyBlocks={story.storyBlocks} />

      {/* TODO: @dan move to toolbar */}
      <ButtonWithLeftIcon
        variant="contained"
        color="primary"
        onClick={() => dispatch(createTextBlock())}
        startIcon={<AddIcon />}
      >
        Add Text Block
      </ButtonWithLeftIcon>
      <ButtonWithLeftIcon
        variant="contained"
        color="primary"
        onClick={saveStory}
        startIcon={<SaveIcon />}
      >
        Save Story
      </ButtonWithLeftIcon>
    </div>
  );
}

const ButtonWithLeftIcon = styled(Button)({
  // left margin is 0px to prevent indent
  margin: '10px 10px 10px 0px'
});
