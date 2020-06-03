import { Box, styled } from '@material-ui/core';
import { EditorState } from 'draft-js';
import React from 'react';
import { Dispatch } from 'redux';
import { updateTextBlock, updateImageBlock } from '../redux/story/actions';
import {
  GRAPH_BLOCK_TYPE,
  MAP_BLOCK_TYPE,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE,
  ImageBlockType,
  IMAGE_BLOCK_TYPE
} from '../redux/story/types';
import GraphBlock from './graph-block/GraphBlock';
import ImageBlock from './image-block/ImageBlock';
import StoryBlockDeleteButton from './StoryBlockDeleteButton';
import RichTextEditor from './text-block/RichTextEditor';

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
        />
      );
    case GRAPH_BLOCK_TYPE:
      return <GraphBlock />;
    case IMAGE_BLOCK_TYPE:
      return (
        <ImageBlock
          key={props.block.id}
          blockId={props.block.id}
          imageUrl={(props.block as ImageBlockType).imageUrl}
          setImageUrl={(imageUrl: string) =>
            props.dispatch(updateImageBlock(props.index, imageUrl))
          }
        />
      );
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
      <StoryBlockDeleteButton {...props} />
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
