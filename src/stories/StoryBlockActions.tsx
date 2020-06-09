import { Apps, DeleteForever } from '@material-ui/icons';
import React from 'react';
import { Dispatch } from 'redux';
import { IconButton } from '../reach-ui/core';
import { deleteBlock, updateGraphBlock } from '../redux/story/actions';
import {
  GRAPH_BLOCK_TYPE,
  StoryBlockType,
  TEXT_BLOCK_TYPE
} from '../redux/story/types';
import { theme } from '../theme/theme';
import { GRAPH_NOT_SELECTED } from './graph-block/GraphBlock';
import { Props as StoryBlockProps } from './StoryBlock';

const storyBlockDeleteButtonAction = (
  storyBlock: StoryBlockType,
  index: number,
  dispatch: Dispatch
): void => {
  //Dont ask for delete confirmation for empty text blocks
  if (
    storyBlock.type === TEXT_BLOCK_TYPE &&
    !storyBlock.editorState.getCurrentContent().hasText()
  ) {
    dispatch(deleteBlock(index));
  } else {
    if (
      window.confirm(
        'Are you sure you wish to delete this item?\n' +
          'This action cannot be undone.'
      )
    )
      dispatch(deleteBlock(index));
  }
};

export function StoryBlockDeleteButton(props: StoryBlockProps) {
  return (
    <IconButton
      onClick={() =>
        storyBlockDeleteButtonAction(props.block, props.index, props.dispatch)
      }
      edge="end"
      aria-label="Delete block"
      style={{ color: theme.palette.error.main }}
      icon={<DeleteForever />}
    />
  );
}

export function StoryBlockSelectableToggle(props: StoryBlockProps) {
  if (props.block.type === GRAPH_BLOCK_TYPE) {
    return (
      <IconButton
        onClick={() =>
          props.dispatch(updateGraphBlock(props.index, GRAPH_NOT_SELECTED))
        }
        aria-label="Toggle selection"
        icon={props.block.graphID !== GRAPH_NOT_SELECTED ? <Apps /> : null}
      />
    );
  }
  return null;
}
