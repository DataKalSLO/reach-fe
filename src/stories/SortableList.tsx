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
import { BlockComponent, TextBlock, StoryBlock } from './StoryObjects';

interface SortableElementProps {
  value: JSX.Element;
}

interface SortableContainerProps {
  children: any;
}

interface SortableListProps {
  setBlocks: (blocks: StoryBlock[]) => void;
  blockComponents: Array<StoryBlock>;
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

function StoryBlockToBlockComponentConverter(
  blockComponents: Array<StoryBlock>
): Array<BlockComponent> {
  const values = new Array<BlockComponent>(blockComponents.length);

  blockComponents.map((storyBlock: StoryBlock) => {
    values[storyBlock.Position] = {
      component: <RichTextEditor key={storyBlock.BlockValue.BlockID} />,
      key: storyBlock.BlockValue.BlockID,
      blockValue: storyBlock.BlockValue
    } as BlockComponent;
  });
  return values;
}

export const SortableList = (props: SortableListProps) => {
  const onSortEnd: SortEndHandler = (sort: SortEnd, event: SortEvent) => {
    props.setBlocks(StoryBlockToBlockComponentConverter(props.blockComponents));
  };

  return (
    <LocalSortableContainer useDragHandle onSortEnd={onSortEnd}>
      {props.blockComponents.map((value, index) => (
        <SortableItem
          key={`item-${value.key}`}
          index={index}
          value={value.component}
        />
      ))}
    </LocalSortableContainer>
  );
};

export default SortableList;
