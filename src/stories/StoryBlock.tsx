import { EditorState } from 'draft-js';
import React from 'react';
import { Dispatch } from 'redux';
import { updateTextBlock } from '../redux/story/actions';
import {
  GRAPH_BLOCK_TYPE,
  MAP_BLOCK_TYPE,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from '../redux/story/types';
import GraphBlock from './GraphBlock';
import RichTextEditor from './RichTextEditor';
import DeleteStoryButton from './DeleteStoryButton';
import { Box, styled } from '@material-ui/core';

interface StoryBlockProps {
  block: StoryBlockType;
  index: number;
  dispatch: Dispatch;
}

const StoryBlockBody = (props: StoryBlockProps): JSX.Element => {
  switch (props.block.type) {
    case TEXT_BLOCK_TYPE:
      return (
        <RichTextEditor
          key={props.block.id}
          editorState={(props.block as TextBlockType).editorState}
          setEditorState={(editorState: EditorState) =>
            props.dispatch(updateTextBlock(props.index, editorState))
          }
          flex-grow={1}
        />
      );
    case GRAPH_BLOCK_TYPE:
      return <GraphBlock />;
    case MAP_BLOCK_TYPE:
      throw new Error('TODO: Map Block type');
    default:
      throw new Error('TODO: Block type not implemented');
  }
};

// Convert a block object into its corresponding React component to be displayed
export const StoryBlock = (props: StoryBlockProps): JSX.Element => {
  return (
    <StoryBlockBox>
      <StoryBlockBody {...props} />
      <DeleteStoryButton {...props} />
    </StoryBlockBox>
  );
};

const StoryBlockBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'nowrap',
  width: '100%'
});
