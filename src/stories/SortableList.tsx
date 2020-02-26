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
import RichTextEditor from './RichTextEditor';
import { Box } from '@material-ui/core';
import { BlockComponent, TextBlock, StoryBlock } from './StoryTypes';

interface SortableElementProps {
  value: JSX.Element;
}

interface SortableContainerProps {
  children: any;
}

interface SortableListProps {
  setBlocks: (blocks: StoryBlock[]) => void;
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

function blockToComponent(block: StoryBlock): JSX.Element {
  console.log('checking type');
  console.log(block.type);
  switch (block.type) {
    case 'Text':
      return <RichTextEditor key={block.blockID} />;
    case 'Graph':
      return <div></div>;
  }
}

export const SortableList = (props: SortableListProps) => {
  const onSortEnd: SortEndHandler = (sort: SortEnd, event: SortEvent) => {
    props.setBlocks(arrayMove(props.storyBlocks, sort.oldIndex, sort.newIndex));
  };

  return (
    <LocalSortableContainer useDragHandle onSortEnd={onSortEnd}>
      {props.storyBlocks.map((block, index) => (
        <SortableItem
          key={`item-${block.blockID}`}
          index={index}
          value={blockToComponent(block)}
        />
      ))}
    </LocalSortableContainer>
  );
};

export default SortableList;
