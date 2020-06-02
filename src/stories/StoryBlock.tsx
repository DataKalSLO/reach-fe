import { Box, styled } from '@material-ui/core';
import { EditorState } from 'draft-js';
import React from 'react';
import { Dispatch } from 'redux';
import { updateGraphBlock, updateTextBlock } from '../redux/story/actions';
import {
  GRAPH_BLOCK_TYPE,
  MAP_BLOCK_TYPE,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from '../redux/story/types';
import GraphBlock from './graph-block/GraphBlock';
import {
  StoryBlockDeleteButton,
  StoryBlockSelectableToggle
} from './StoryBlockActions';
import RichTextEditor from './text-block/RichTextEditor';

export interface Props {
  block: StoryBlockType;
  index: number;
  dispatch: Dispatch;
}

// Convert a block object into its corresponding React component to be displayed
export const StoryBlock = (props: Props): JSX.Element => {
  const Body = (): JSX.Element => {
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
        return (
          <GraphBlock
            key={props.block.id}
            graphID={props.block.graphID}
            setGraphId={(graphId: string) =>
              props.dispatch(updateGraphBlock(props.index, graphId))
            }
          />
        );
      case MAP_BLOCK_TYPE:
        throw new Error('TODO: Map Block type');
      default:
        throw new Error('TODO: Block type not implemented');
    }
  };

  const Actions = (): JSX.Element => (
    <Box display="flex" flexDirection="column">
      <StoryBlockSelectableToggle {...props} />
      <StoryBlockDeleteButton {...props} />
    </Box>
  );

  return (
    <StoryBlockBox>
      <Body />
      <Actions />
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
