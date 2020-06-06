import { Box, styled } from '@material-ui/core';
import { EditorState } from 'draft-js';
import React from 'react';
import { Dispatch } from 'redux';
import {
  updateGraphBlock,
  updateImageBlock,
  updateTextBlock
} from '../redux/story/actions';
import {
  GraphBlockType,
  GRAPH_BLOCK_TYPE,
  ImageBlockType,
  IMAGE_BLOCK_TYPE,
  MAP_BLOCK_TYPE,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from '../redux/story/types';
import GraphBlock from './graph-block/GraphBlock';
import ImageBlock from './image-block/ImageBlock';
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
const StoryBlock = (props: Props): JSX.Element => {
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

// prevent unnecessary re-renders
const areEqual = (prevProps: Props, nextProps: Props) => {
  if (prevProps.block.type === GRAPH_BLOCK_TYPE)
    return (
      /* render triggered when graphID changes. this can happen when:
       *   - a new GraphBlock is added (loads user's graphs)
       *   - a graph from the gallery is selected (loads interactive version selected graph)
       */
      prevProps.block.graphID === (nextProps.block as GraphBlockType).graphID
    );
  else {
    return false;
  }
};

export default React.memo(StoryBlock, areEqual);
