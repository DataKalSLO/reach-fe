import { Box, IconButton, styled } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';
import { Dispatch } from 'redux';
import { IconButton as CustomIconButton } from '../common/components/IconButton';
import { deleteBlock, swapBlocks } from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import { StoryBlockType, TEXT_BLOCK_TYPE } from '../redux/story/types';
import { theme } from '../theme/theme';
import { StoryBlock } from './StoryBlock';

// The input to the sortable list, objects to be converted into JSX.Elements
interface SortableListProps {
  storyBlocks: Array<StoryBlockType>;
}

// (i.e. <RichTextEditor>)
interface SortableItemProps {
  myIndex: number; //myIndex naming needed because of https://github.com/clauderic/react-sortable-hoc/issues/128
  dispatch: Dispatch;
  block: StoryBlockType;
}

// Properties containing all draggable blocks (i.e. Array of {<DragHandle> and <StoryBlock>})
interface SortableStoryContainerProps {
  children: Array<JSX.Element>;
}

interface DeleteButtonProps {
  index: number;
  dispatch: Dispatch;
  block: StoryBlockType;
}

const DragHandle = SortableHandle(() => (
  <IconButton color="primary" edge="start" aria-label="Drag Handle">
    <DragHandleIcon />
  </IconButton>
));

const deleteButtonAction = (
  storyBlock: StoryBlockType,
  index: number,
  dispatch: Dispatch
): void => {
  //Dont ask for delete confirmation with empty text blocks
  if (
    storyBlock.type === TEXT_BLOCK_TYPE &&
    !storyBlock.editorState.getCurrentContent().hasText()
  ) {
    dispatch(deleteBlock(index));
  } else {
    if (window.confirm('Are you sure you wish to delete this item?'))
      dispatch(deleteBlock(index));
  }
};

const DeleteButton = (props: DeleteButtonProps) => (
  <CustomIconButton
    onClick={() => deleteButtonAction(props.block, props.index, props.dispatch)}
    edge="end"
    aria-label="Delete block"
    style={{ color: theme.palette.error.main }}
    icon={<DeleteForever />}
  />
);

// Component that determines what is in each draggable block
const SortableStoryBlock = SortableElement((props: SortableItemProps) => (
  <StoryBlockBox>
    <DragHandle />
    <Box flexGrow={2}>
      <StoryBlock
        block={props.block}
        myIndex={props.myIndex}
        dispatch={props.dispatch}
      />
    </Box>
    <DeleteButton
      index={props.myIndex}
      dispatch={props.dispatch}
      block={props.block}
    />
  </StoryBlockBox>
));

// Container for all sortable story blocks
const SortableStoryContainer = SortableContainer(
  (props: SortableStoryContainerProps) => {
    return <div>{props.children}</div>;
  }
);

const SortableList = (props: SortableListProps) => {
  const dispatch = useDispatch();

  return (
    <SortableStoryContainer
      useDragHandle={true}
      onSortEnd={sort => dispatch(swapBlocks(sort.oldIndex, sort.newIndex))}
    >
      {props.storyBlocks.map((block, index) => {
        return (
          <SortableStoryBlock
            key={`item-${block.id}`}
            index={index}
            myIndex={index}
            dispatch={dispatch}
            block={block}
          />
        );
      })}
    </SortableStoryContainer>
  );
};

export default SortableList;

const StoryBlockBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'nowrap'
});
