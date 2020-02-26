import React, { useReducer } from 'react';
import { EditorState } from 'draft-js';
import RichTextEditor from './RichTextEditor';

// DEMO
// * implements useReducer for maintaining form state in a scaleable way
// * replaced state logic in RichTextEditor with dispatch function

// Story Types
interface TextStoryBlock {
  id: number;
  editorState: EditorState;
}

type Story = {
  title: string;
  storyBlocks: TextStoryBlock[];
};

// Action Types
//
// Action was created as the union of three objects
// because TypeScript will create automatic type guards
// (https://www.sumologic.com/blog/react-hook-typescript/)
const UPDATE_TEXT_BLOCK = 'UPDATE_TEXT_BLOCK';
const UPDATE_TITLE = 'UPDATE_TITLE';

type Action =
  | { type: typeof UPDATE_TITLE }
  | {
      type: typeof UPDATE_TEXT_BLOCK;
      payload: { id: number; editorState: EditorState };
    };

// TODO: can be removed with syntactic sugar later
function updateTextBlock(
  storyBlocks: TextStoryBlock[],
  id: number,
  editorState: EditorState
) {
  storyBlocks[id] = { id: id, editorState: editorState };
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
          action.payload.id,
          action.payload.editorState
        )
      };
    default:
      throw new Error();
  }
}

const initialValues: Story = {
  title: 'Title',
  storyBlocks: [
    { id: 0, editorState: EditorState.createEmpty() },
    { id: 1, editorState: EditorState.createEmpty() },
    { id: 2, editorState: EditorState.createEmpty() }
  ]
};

export default function StoryForm() {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <div>
      <h1>{state.title}</h1>
      {state.storyBlocks.map((storyBlock: TextStoryBlock) => (
        <RichTextEditor
          key={storyBlock.id}
          editorState={storyBlock.editorState}
          setEditorState={(s: EditorState) =>
            dispatch({
              type: UPDATE_TEXT_BLOCK,
              payload: { id: storyBlock.id, editorState: s }
            })
          }
        />
      ))}
      <button onClick={() => alert(JSON.stringify(state, null, 2))}>
        submit
      </button>
    </div>
  );
}
