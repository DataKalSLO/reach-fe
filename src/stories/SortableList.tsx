import { Box, IconButton, styled } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { EditorState } from 'draft-js';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';
import { Dispatch } from 'redux';
import { swapBlocks, updateTextBlock } from '../redux/story/actions';
import RichTextEditor from './RichTextEditor';
import {
  GRAPH_BLOCK,
  MAP_BLOCK,
  StoryBlock,
  TextBlock,
  TEXT_BLOCK
} from './StoryTypes';

// Properties to be passed into a sortable element,
// defining the body of the draggable piece, aside from the drag handle
interface SortableElementProps {
  value: JSX.Element;
}

// Proerties that define the list of components to be draggable, list can be of type any
interface SortableContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: Array<any>;
}

// The input to the sortable list, objects to be converted into JSX.Element's
interface SortableListProps {
  storyBlocks: Array<StoryBlock>;
}

// Component to determine what can be dragged as the drag handle
const DragHandle = SortableHandle(() => (
  // This needs to be wrapped in a div to make the ripple the correct size
  <div>
    <IconButton color="primary" disableRipple={true}>
      <DragHandleIcon />
    </IconButton>
  </div>
));

// TODO: Add functionality to remove a story block
// Component that determines what is in each draggable block
const LocalSortableElement = SortableElement((props: SortableElementProps) => (
  <StoryBlockBox>
    <DragHandle />
    {props.value}
  </StoryBlockBox>
));

// Container for all items in the list,
// passed as SortableContainerProps which can contain a list of any type
const LocalSortableContainer = SortableContainer(
  (props: SortableContainerProps) => {
    return <div>{props.children}</div>;
  }
);

//Convert a block object into it's corresponding react component to be displayed
function blockToComponent(
  block: StoryBlock,
  index: number,
  dispatch: Dispatch
): JSX.Element {
  switch (block.type) {
    case TEXT_BLOCK:
      return (
        <RichTextEditor
          key={block.id}
          editorState={(block as TextBlock).editorState}
          setEditorState={(editorState: EditorState) =>
            dispatch(updateTextBlock(index, editorState))
          }
        />
      );
    case GRAPH_BLOCK:
      throw new Error('TODO: Graph Block type');
    case MAP_BLOCK:
      throw new Error('TODO: Map Block type');
    default:
      throw new Error('TODO: Block type not implemented');
  }
}

export const SortableList = (props: SortableListProps) => {
  const dispatch = useDispatch();

  return (
    <LocalSortableContainer
      useDragHandle
      onSortEnd={sort => dispatch(swapBlocks(sort.oldIndex, sort.newIndex))}
    >
      {props.storyBlocks.map((block, index) => (
        <LocalSortableElement
          key={`item-${block.id}`}
          index={index}
          value={blockToComponent(block, index, dispatch)}
        />
      ))}
    </LocalSortableContainer>
  );
};

export default SortableList;

const StoryBlockBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});
