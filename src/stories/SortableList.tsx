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
  GRAPH_BLOCK_TYPE,
  MAP_BLOCK_TYPE,
  StoryBlock,
  TextBlock,
  TEXT_BLOCK_TYPE
} from './StoryTypes';
import GraphBlock from './GraphBlock';

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
    <IconButton color="primary">
      <DragHandleIcon />
    </IconButton>
  </div>
));

// TODO: Add button to remove a story block
// Component that determines what is in each draggable block
const SortableStoryBlock = SortableElement((props: SortableItemProps) => (
  <StoryBlockBox>
    <DragHandle />
    {props.value}
  </StoryBlockBox>
));

// Container for all sortable story blocks
const SortableStoryContainer = SortableContainer(
  (props: SortableStoryContainerProps) => {
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
      return <GraphBlock />;
    case MAP_BLOCK_TYPE:
      throw new Error('TODO: Map Block type');
    default:
      throw new Error('TODO: Block type not implemented');
  }
}

const SortableList = (props: SortableListProps) => {
  const dispatch = useDispatch();

  return (
    <SortableStoryContainer
      useDragHandle={true}
      onSortEnd={sort => dispatch(swapBlocks(sort.oldIndex, sort.newIndex))}
    >
      {props.storyBlocks.map((block, index) => (
        <SortableStoryBlock
          key={`item-${block.id}`}
          index={index}
          value={blockToComponent(block, index, dispatch)}
        />
      ))}
    </SortableStoryContainer>
  );
};

export default SortableList;

const StoryBlockBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});
