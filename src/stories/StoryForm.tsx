import { Button, styled, Typography, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmptyTextBlock } from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import SortableList from '../stories/SortableList';

export default function StoryForm() {
  const dispatch = useDispatch();
  const story = useSelector(getStory);

  function saveStory() {
    alert(JSON.stringify(story.storyBlocks, null, 2));
  }

  return (
    <div>
      {/* TODO: @Tanner - Make this a required text input */}
      <Typography variant="h3">{story.title}</Typography>

      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows="2"
        variant="outlined"
        fullWidth
      />

      <SortableList storyBlocks={story.storyBlocks} />

      {/* TODO: @Daniel - Move buttons to toolbar */}
      <ButtonWithLeftIcon
        variant="contained"
        color="primary"
        onClick={() => dispatch(createEmptyTextBlock())}
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
