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

interface SortableElementProps {
  value: JSX.Element;
}

interface SortableContainerProps {
  children: any;
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

export const SortableList = () => {
  const [items, setItems] = useState([
    <RichTextEditor
      sendData={() => {
        return;
      }}
      key={1}
    />,
    <RichTextEditor
      sendData={() => {
        return;
      }}
      key={1}
    />,
    <RichTextEditor
      sendData={() => {
        return;
      }}
      key={1}
    />
  ] as Array<JSX.Element>);

  const onSortEnd: SortEndHandler = (sort: SortEnd, event: SortEvent) => {
    setItems(arrayMove(items, sort.oldIndex, sort.newIndex));
  };

  return (
    <LocalSortableContainer useDragHandle onSortEnd={onSortEnd}>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </LocalSortableContainer>
  );
};

export default SortableList;
