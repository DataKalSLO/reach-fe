import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import SortableList from '../stories/SortableList';
import { Button, LinearProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getStory } from '../redux/story/selectors';
import { createTextBlock } from '../redux/story/actions';

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
      <h1>{story.title}</h1>
      {/* TODO: @kev */}
      <h4>{story.description}</h4>
      <SortableList storyBlocks={story.storyBlocks} />

      {/* TODO: @dan move to toolbar */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(createTextBlock())}
        startIcon={<AddIcon />}
      >
        Add Text Block
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={saveStory}
        startIcon={<SaveIcon />}
      >
        Save Story
      </Button>
    </div>
  );
}
