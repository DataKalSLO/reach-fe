import { Box, IconButton, styled } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';
import { Dispatch } from 'redux';
import { swapBlocks } from '../redux/story/actions';
import { StoryBlockType } from '../redux/story/types';
import StoryBlock from './StoryBlock';

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

const DragHandle = SortableHandle(() => (
  <IconButton color="primary" edge="start" aria-label="Drag Handle">
    <DragHandleIcon />
  </IconButton>
));

// Component that determines what is in each draggable block
const SortableStoryBlock = SortableElement((props: SortableItemProps) => (
  <SortableBox>
    <DragHandle />
    <StoryBlock
      block={props.block}
      index={props.myIndex}
      dispatch={props.dispatch}
    />
  </SortableBox>
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

const SortableBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});
