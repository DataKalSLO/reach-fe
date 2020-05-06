import { TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDescription, updateTitle } from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import { getStoryBuilder } from '../redux/storybuilder/selectors';
import SortableList from '../stories/SortableList';
import { convertStoryToJSX } from './StoryConverter';

export default function StoryForm() {
  const dispatch = useDispatch();
  const story = useSelector(getStory);
  const storyBuilderState = useSelector(getStoryBuilder);
  const previewSelected = storyBuilderState.isPreviewSelected;

  const TITLE_CHAR_LIMIT = 100;
  const DESCRIPTION_CHAR_LIMIT = 250;

  function createCharCounter(currentText: string, maxLength: number) {
    return `${currentText.length}/${maxLength}`;
  }

  // TODO: add validation of required fields
  if (previewSelected) {
    return <div>{convertStoryToJSX(story)}</div>;
  } else {
    return (
      <div>
        <Typography variant="h3">StoryBuilder</Typography>
        <p>
          Tell us a compelling story using data. Use the toolbar on the left to
          add text blocks, graphs, images, and dataset snippets to help readers
          follow along with your findings and conclusions. Use the drag handles
          to the left of each component if you want to reorder them.
        </p>
        <TextField
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
        <TextField
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
      </div>
    );
  }
}
