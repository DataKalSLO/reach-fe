import { Button, styled, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createEmptyTextBlock,
  updateDescription,
  updateTitle
} from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import SortableList from '../stories/SortableList';

export default function StoryForm() {
  const dispatch = useDispatch();
  const story = useSelector(getStory);

  function saveStory() {
    alert(JSON.stringify(story, null, 2));
  }

  return (
    <div>
      <StyledTextField
        id="story-title-field"
        label="Title"
        variant="outlined"
        fullWidth
        required
        onChange={event => dispatch(updateTitle(event.target.value))}
        defaultValue={story ? story.title : ''}
      />
      <StyledTextField
        id="story-description-field"
        label="Description"
        variant="outlined"
        multiline
        rows="2"
        fullWidth
        required
        onChange={event => dispatch(updateDescription(event.target.value))}
        defaultValue={story ? story.description : ''}
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

const StyledTextField = styled(TextField)({
  paddingBottom: '10px'
});
