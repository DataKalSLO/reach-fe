import { Box, styled, IconButton } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { EditorState } from 'draft-js';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';
import { swapBlocks, updateTextBlock } from '../redux/story/actions';
import RichTextEditor from './RichTextEditor';
import {
  TextBlock,
  StoryBlock,
  TEXT_BLOCK,
  GRAPH_BLOCK,
  MAP_BLOCK
} from './StoryTypes';
import { Dispatch } from 'redux';

interface SortableElementProps {
  value: JSX.Element;
}

interface SortableContainerProps {
  // Sortable container can contain any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

interface SortableListProps {
  storyBlocks: Array<StoryBlock>;
}

const DragHandle = SortableHandle(() => (
  <IconButton color="primary" disableRipple={true}>
    <DragHandleIcon />
  </IconButton>
));

const SortableItem = SortableElement((props: SortableElementProps) => (
  <StoryBlockBox>
    <DragHandle />
    {props.value}
  </StoryBlockBox>
));

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
        <SortableItem
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
  flexDirection: 'row'
});
