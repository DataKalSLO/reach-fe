import { Box, IconButton, styled } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';
import { swapBlocks } from '../redux/story/actions';
import { StoryBlock } from '../redux/story/types';
import { StoryBlockWrapper } from './StoryBlockWrapper';

// The input to the sortable list, objects to be converted into JSX.Elements
interface SortableListProps {
  storyBlocks: Array<StoryBlock>;
}

// (i.e. <RichTextEditor>)
interface SortableItemProps {
  value: JSX.Element;
}

// Properties containing all draggable blocks (i.e. Array of {<DragHandle> and <StoryBlock>})
interface SortableStoryContainerProps {
  children: Array<JSX.Element>;
}

const DragHandle = SortableHandle(() => (
  // This needs to be wrapped in a div to make the ripple the correct size
  <div>
    <IconButton color="primary" edge="start" aria-label="Drag handle">
      <DragHandleIcon />
    </IconButton>
  </div>
));

// TODO: Add button to remove a story block
// Component that determines what is in each draggable block
const SortableStoryBlock = SortableElement((props: SortableItemProps) => {
  return (
    <div>
      <StoryBlockBox>
        <DragHandle />
        {props.value}
      </StoryBlockBox>
    </div>
  );
});

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
        console.log(index);
        return (
          <SortableStoryBlock
            key={`item-${block.id}`}
            index={index}
            value={
              <StoryBlockWrapper
                value={block}
                myIndex={index}
                dispatch={dispatch}
              />
            }
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
  alignItems: 'center'
});
