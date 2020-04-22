import { EditorState } from 'draft-js';
import React from 'react';
import { Dispatch } from 'redux';
import { updateTextBlock } from '../redux/story/actions';
import {
  GRAPH_BLOCK_TYPE,
  MAP_BLOCK_TYPE,
  StoryBlock,
  TextBlock,
  TEXT_BLOCK_TYPE
} from '../redux/story/types';
import RichTextEditor from './RichTextEditor';

interface StoryBlockComponentProps {
  block: StoryBlock;
  myIndex: number;
  dispatch: Dispatch;
}

//Convert a block object into it's corresponding react component to be displayed
export const StoryBlockComponent = (
  props: StoryBlockComponentProps
): JSX.Element => {
  switch (props.block.type) {
    case TEXT_BLOCK_TYPE:
      return (
        <RichTextEditor
          key={props.block.id}
          editorState={(props.block as TextBlock).editorState}
          setEditorState={(editorState: EditorState) =>
            props.dispatch(updateTextBlock(props.myIndex, editorState))
          }
        />
      );
    case GRAPH_BLOCK_TYPE:
      throw new Error('TODO: Graph Block type');
    case MAP_BLOCK_TYPE:
      throw new Error('TODO: Map Block type');
    default:
      throw new Error('TODO: Block type not implemented');
  }
};
