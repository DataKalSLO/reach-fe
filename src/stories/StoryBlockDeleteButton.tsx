import { DeleteForever } from '@material-ui/icons';
import React from 'react';
import { Dispatch } from 'redux';
import { IconButton } from '../reach-ui/core';
import { deleteBlock } from '../redux/story/actions';
import { StoryBlockType } from '../redux/story/types';
import { theme } from '../theme/theme';
import { storyBlockHasContent } from '../redux/story/utilities';

interface StoryBlockDeleteButtonProps {
  index: number;
  dispatch: Dispatch;
  block: StoryBlockType;
}

const storyBlockDeleteButtonAction = (
  storyBlock: StoryBlockType,
  index: number,
  dispatch: Dispatch
): void => {
  //Dont ask for delete confirmation for empty text blocks
  if (storyBlockHasContent(storyBlock)) {
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

const StoryBlockDeleteButton = (props: StoryBlockDeleteButtonProps) => (
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

export default StoryBlockDeleteButton;
