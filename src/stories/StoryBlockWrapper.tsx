import { IconButton } from '../common/components/IconButton';
import { DeleteForever } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { EditorState } from 'draft-js';
import { updateTextBlock, deleteBlock } from '../redux/story/actions';
import RichTextEditor from './RichTextEditor';
import {
  GRAPH_BLOCK_TYPE,
  MAP_BLOCK_TYPE,
  StoryBlock,
  TextBlock,
  TEXT_BLOCK_TYPE
} from '../redux/story/types';
import React from 'react';
import { Dispatch } from 'redux';

interface DeleteButtonProps {
  index: number;
  dispatch: Dispatch;
}

interface StoryBlockWrapperProps {
  value: StoryBlock;
  myIndex: number;
  dispatch: Dispatch;
}

const DeleteButton = (props: DeleteButtonProps) => (
  <IconButton
    onClick={() => props.dispatch(deleteBlock(props.index))}
    edge="end"
    aria-label="Delete block"
    color="secondary"
    icon={<DeleteForever />}
  />
);

//Convert a block object into it's corresponding react component to be displayed
function blockToComponent(
  block: StoryBlock,
  index: number,
  dispatch: Dispatch
): JSX.Element {
  switch (block.type) {
    case TEXT_BLOCK_TYPE:
      return (
        <RichTextEditor
          key={block.id}
          editorState={(block as TextBlock).editorState}
          setEditorState={(editorState: EditorState) =>
            dispatch(updateTextBlock(index, editorState))
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
}

export const StoryBlockWrapper = (props: StoryBlockWrapperProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={11}>
        {blockToComponent(props.value, props.myIndex, props.dispatch)}
      </Grid>
      <Grid item xs={1}>
        <DeleteButton index={props.myIndex} dispatch={props.dispatch} />
      </Grid>
    </Grid>
  );
};
