import { DeleteForever } from '@material-ui/icons';
import React from 'react';
import { Dispatch } from 'redux';
import { IconButton } from '../reach-ui/core';
import { deleteBlock } from '../redux/story/actions';
import {
  ImageBlockType,
  IMAGE_BLOCK_TYPE,
  StoryBlockType
} from '../redux/story/types';
import { theme } from '../theme/theme';
import { storyBlockHasContent } from '../redux/story/utilities';
import { deleteImageBlockImage } from '../api/stories/imageBlocks/operations';

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
    ) {
      if (
        storyBlock.type === IMAGE_BLOCK_TYPE &&
        (storyBlock as ImageBlockType).imageUrl !== ''
      ) {
        deleteImageBlockImage((storyBlock as ImageBlockType).imageUrl);
      }
      dispatch(deleteBlock(index));
    }
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
