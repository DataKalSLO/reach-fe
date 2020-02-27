import React, { Component, useState } from 'react';
import { render } from 'react-dom';
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
  BlockComponent,
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
  children: any;
}

interface SortableListProps {
  dispatchAction: React.Dispatch<Action>;
  storyBlocks: Array<StoryBlock>;
}

const DragHandle = SortableHandle(() => (
  <span>
    <DragHandleIcon />
  </span>
));

const SortableItem = SortableElement((props: SortableElementProps) => (
  <div>
    <Box color="gray" bgcolor="white" p={1} border={1}>
      <div>
        <DragHandle />
        {props.value}
      </div>
    </Box>
  </div>
));

const LocalSortableContainer = SortableContainer(
  (props: SortableContainerProps) => {
    return <ul>{props.children}</ul>;
  }
);

// function StoryBlockToBlockComponentConverter(
//   blockComponents: Array<StoryBlock>
// ): Array<BlockComponent> {
//   const values = new Array<BlockComponent>(blockComponents.length);

//   blockComponents.map((storyBlock: StoryBlock) => {
//     values[storyBlock.position] = {
//       component: <RichTextEditor key={storyBlock.blockValue.blockID} />,
//       key: storyBlock.blockValue.blockID,
//       blockValue: storyBlock.blockValue
//     } as BlockComponent;
//   });
//   return values;
//}

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
      return <div></div>;
    default:
      console.log('Error', block.type);
      return <div></div>;
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
