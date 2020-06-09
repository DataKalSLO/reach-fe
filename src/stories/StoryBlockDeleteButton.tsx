import { deleteBlock } from '../redux/story/actions';
import { DeleteForever } from '@material-ui/icons';
import { deleteImageFromBlock } from './image-block/ImageBlock';
import { Dispatch } from 'redux';
import { IconButton } from '../reach-ui/core';
import {
  ImageBlockType,
  IMAGE_BLOCK_TYPE,
  StoryBlockType
} from '../redux/story/types';
import { storyBlockHasContent } from '../redux/story/utilities';
import React from 'react';
import { theme } from '../theme/theme';

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
        // if deleting an image block, we want to delete the image from s3 as well
        deleteImageFromBlock((storyBlock as ImageBlockType).imageUrl);
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
