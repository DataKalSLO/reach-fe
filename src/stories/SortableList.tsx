import React from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  SortEndHandler,
  SortEnd,
  SortEvent
} from 'react-sortable-hoc';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import arrayMove from 'array-move';
import { EditorState } from 'draft-js';
import RichTextEditor from './RichTextEditor';
import { Box } from '@material-ui/core';
import {
  TextBlock,
  StoryBlock,
  UPDATE_TEXT_BLOCK,
  Action,
  CHANGE_BLOCKS
} from './StoryTypes';

interface SortableElementProps {
  value: JSX.Element;
}

interface SortableContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

interface SortableListProps {
  dispatchAction: React.Dispatch<Action>;
  storyBlocks: Array<StoryBlock>;
}

const DragHandle = SortableHandle(() => <DragHandleIcon />);

const SortableItem = SortableElement((props: SortableElementProps) => (
  <div>
    <Box color="gray" bgcolor="white" p={1} border={1}>
      <DragHandle />
      {props.value}
    </Box>
  </div>
));

const LocalSortableContainer = SortableContainer(
  (props: SortableContainerProps) => {
    return <ul>{props.children}</ul>;
  }
);

//Convert a block object into it's corresponding react component to be displayed
function blockToComponent(
  block: StoryBlock,
  index: number,
  dispatch: React.Dispatch<Action>
): JSX.Element {
  switch (block.type) {
    case 'Text':
      return (
        <RichTextEditor
          key={block.id}
          editorState={(block as TextBlock).editorState}
          setEditorState={(editorState: EditorState) =>
            dispatch({
              type: UPDATE_TEXT_BLOCK,
              payload: { index: index, editorState: editorState }
            })
          }
        />
      );
    case 'Graph':
      return <div>Not yet Implemented</div>;
    default:
      console.log('Error', block.type);
      return <div>Error: Invalid block type</div>;
  }
}

export const SortableList = (props: SortableListProps) => {
  const onSortEnd: SortEndHandler = (sort: SortEnd, event: SortEvent) => {
    props.dispatchAction({
      type: CHANGE_BLOCKS,
      payload: {
        newBlocks: arrayMove(props.storyBlocks, sort.oldIndex, sort.newIndex)
      }
    });
  };

  return (
    <LocalSortableContainer useDragHandle onSortEnd={onSortEnd}>
      {props.storyBlocks.map((block, index) => (
        <SortableItem
          key={`item-${block.id}`}
          index={index}
          value={blockToComponent(block, index, props.dispatchAction)}
        />
      ))}
    </LocalSortableContainer>
  );
};

export default SortableList;
