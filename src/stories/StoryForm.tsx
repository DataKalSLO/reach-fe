import {
  Box,
  Button,
  styled,
  TextField,
  Typography,
  Grid,
  Paper
} from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertStoryToJSX } from './StoryConverter';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import {
  createEmptyTextBlock,
  updateDescription,
  updateTitle,
  createGraphBlock
} from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import SortableList from './SortableList';

interface Props {
  previewSelected: boolean;
  togglePreview: () => void;
}
export default function StoryForm(props: Props) {
  const dispatch = useDispatch();
  const story = useSelector(getStory);

  const TITLE_CHAR_LIMIT = 100;
  const DESCRIPTION_CHAR_LIMIT = 250;

  // TODO: add validation of required fields
  // TODO: Move preview selected into Redux to persist after user leaves page
  // const [previewSelected, setPreviewSelected] = useState(false);

  function createCharCounter(currentText: string, maxLength: number) {
    return `${currentText.length}/${maxLength}`;
  }

  // function togglePreview() {
  //   setPreviewSelected(!previewSelected);
  // }

  function displayBody(): JSX.Element {
    if (props.previewSelected) {
      return convertStoryToJSX(story);
    } else {
      // TODO: refactor everything inside of the return into a seperate component
      return (
        <div>
          <Typography variant="h3">StoryBuilder</Typography>
          <p>
            Tell us a compelling story using data. Use the toolbar on the right
            to add text blocks, graphs, static images, and dataset snippets to
            help readers follow along with your findings and conclusions. Use
            the drag handles to the left of each component if you want to
            reorder them.
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
        </div>
      );
    }
  }

  return <StyledBox>{displayBody()}</StyledBox>;
}

const StyledBox = styled(Box)({
  margin: '20px 10px 20px 10px'
});

const ButtonWithLeftIcon = styled(Button)({
  // left margin is 0px to prevent indent
  margin: '10px 10px 10px 0px'
});

const StyledTextField = styled(TextField)({
  margin: '10px 10px 10px 0px'
});
