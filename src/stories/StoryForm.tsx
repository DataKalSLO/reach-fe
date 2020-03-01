// DEMO: accessing story state from Redux
//
// PLEASE DON'T CODE REVIEW THIS FILE
// It will be completely rewritten in a future PR.

import React, { useEffect } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import { Button, LinearProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getStory } from '../redux/story/selectors';
import { updateTextBlock } from '../redux/story/actions';
import RichTextEditor from './RichTextEditor';
import { TextBlock } from './StoryTypes';
import { EditorState } from 'draft-js';

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
      <h1>{story.title}</h1>
      <h4>{story.description}</h4>
      <RichTextEditor
        editorState={(story.storyBlocks[0] as TextBlock).editorState}
        setEditorState={(editorState: EditorState) =>
          dispatch(updateTextBlock(0, editorState))
        }
      />
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
