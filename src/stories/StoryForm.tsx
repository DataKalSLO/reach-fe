import React, { useReducer } from 'react';
import { EditorState } from 'draft-js';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import SortableList from '../stories/SortableList';
import { Button } from '@material-ui/core';
import {
  SaveStory,
  Story,
  GenerateEmptyStory,
  StoryBlock,
  TextBlock,
  UPDATE_TITLE,
  UPDATE_TEXT_BLOCK,
  Action,
  CHANGE_BLOCKS
} from '../stories/StoryTypes';
import uuidv4 from 'uuid/v4';

// DEMO
// * implements useReducer for maintaining form state in a scaleable way
// * replaced state logic in RichTextEditor with dispatch function

// TODO: can be removed with syntactic sugar later
function updateTextBlock(
  storyBlocks: Array<StoryBlock>,
  index: number,
  editorState: EditorState
) {
  storyBlocks[index] = {
    id: storyBlocks[index].id,
    type: 'Text',
    editorState: editorState
  } as TextBlock;
  return storyBlocks;
}

// reducer is passed to useReducer and used to manage updating the state
function reducer(state: Story, action: Action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return { ...state, title: 'New Title' };
    case UPDATE_TEXT_BLOCK:
      return {
        ...state,
        storyBlocks: updateTextBlock(
          state.storyBlocks,
          action.payload.index,
          action.payload.editorState
        )
      };
    case CHANGE_BLOCKS:
      return {
        ...state,
        storyBlocks: action.payload.newBlocks
      };
    default:
      throw new Error();
  }
}

export default function StoryForm() {
  const tempUserId = uuidv4();

  const [story, dispatch] = useReducer(reducer, GenerateEmptyStory(tempUserId));

  return (
    <div>
      <h1>{story.title}</h1>
      {/*<RichTextEditor />*/}
      <div>
        <SortableList
          storyBlocks={story.storyBlocks}
          dispatchAction={dispatch}
        />
      </div>
      {/*TODO: Make this cleaner*/}
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          dispatch({
            type: CHANGE_BLOCKS,
            payload: {
              newBlocks: story.storyBlocks.concat([
                {
                  id: uuidv4(),
                  editorState: EditorState.createEmpty(),
                  type: 'Text'
                } as TextBlock
              ] as Array<StoryBlock>)
            }
          })
        }
        startIcon={<AddIcon />}
      >
        Add Story
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => SaveStory(story)}
        startIcon={<SaveIcon />}
      >
        Save Story
      </Button>
    </div>
  );
}
