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
import { saveStoryToDatabase } from './StoryAPIConnector';

export default function StoryForm() {
  const dispatch = useDispatch();
  const story = useSelector(getStory);

  const TITLE_CHAR_LIMIT = 100;
  const DESCRIPTION_CHAR_LIMIT = 250;

  // TODO: add validation of required fields
  function saveStory() {
    alert(JSON.stringify(story, null, 2));
    story.userID = '51d73193-470d-442b-a392-3e43238eb089'; //Existing user
    saveStoryToDatabase(story)
      .then(res => {
        console.log('Story Created!');
        console.log(res);
      })
      .catch(e => console.log(e));
  }

  function createCharCounter(currentText: string, maxLength: number) {
    return `${currentText.length}/${maxLength}`;
  }

  return (
    <div>
      <StyledTextField
        id="story-title-field"
        label="Title"
        variant="outlined"
        fullWidth
        required
        margin="dense"
        helperText={createCharCounter(story.title, TITLE_CHAR_LIMIT)}
        inputProps={{ maxLength: TITLE_CHAR_LIMIT }}
        onChange={event => dispatch(updateTitle(event.target.value))}
        defaultValue={story ? story.title : ''}
      />
      <StyledTextField
        id="story-description-field"
        label="Description"
        variant="outlined"
        multiline
        fullWidth
        required
        margin="dense"
        helperText={createCharCounter(
          story.description,
          DESCRIPTION_CHAR_LIMIT
        )}
        inputProps={{ maxLength: DESCRIPTION_CHAR_LIMIT }}
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
  margin: '10px 10px 10px 0px'
});
