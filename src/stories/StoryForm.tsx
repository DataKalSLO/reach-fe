import { Box, styled, TextField, Typography } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../common/components/Button';
import { updateDescription, updateTitle } from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import { getStoryBuilder } from '../redux/storybuilder/selectors';
import SortableList from '../stories/SortableList';
import { saveStory } from './StoryAPIConnector';
import { convertStoryToJSX } from './StoryConverter';

export default function StoryForm() {
  const dispatch = useDispatch();
  const story = useSelector(getStory);
  const storyBuilderState = useSelector(getStoryBuilder);
  const previewSelected = storyBuilderState.isPreviewSelected;

  const TITLE_CHAR_LIMIT = 100;
  const DESCRIPTION_CHAR_LIMIT = 250;

  // TODO: add validation of required fields
  // TODO: Move preview selected into Redux to persist after user leaves page
  const [previewSelected, setPreviewSelected] = useState(false);

  function saveStoryButtonAction() {
    alert(JSON.stringify(story, null, 2));
    story.userID = 'test@test.com'; //Existing user in database

    saveStory(story)
      .then(res => {
        console.log('Story Created!');
        console.log(res);
      })
      .catch(e => console.log(e));
  }

  function createCharCounter(currentText: string, maxLength: number) {
    return `${currentText.length}/${maxLength}`;
  }

  // TODO: add validation of required fields
  if (previewSelected) {
    return <StyledBox>{convertStoryToJSX(story)}</StyledBox>;
  } else {
    return (
      <StyledBox>
        <Typography variant="h3">StoryBuilder</Typography>
        <p>
          Tell us a compelling story using data. Use the toolbar on the right to
          add text blocks, graphs, static images, and dataset snippets to help
          readers follow along with your findings and conclusions. Use the drag
          handles to the left of each component if you want to reorder them.
        </p>
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

        <Button
          onClick={saveStoryButtonAction}
          label="Save Story"
          startIcon={<Save />}
          edge="start"
        />
      </StyledBox>
    );
  }
}

const StyledBox = styled(Box)({
  margin: '20px 10px 20px 10px'
});

const StyledTextField = styled(TextField)({
  margin: '10px 10px 10px 0px'
});
