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
import arrayMove from 'array-move';

interface SortableElementProps {
  value: string;
}

interface SortableContainerProps {
  children: any;
}

const DragHandle = SortableHandle(() => <span>::</span>);

const SortableItem = SortableElement((props: SortableElementProps) => (
  <li>
    <DragHandle />
    {props.value}
  </li>
));

const LocalSortableContainer = SortableContainer(
  (props: SortableContainerProps) => {
    return <ul>{props.children}</ul>;
  }
);

export const SortableList = () => {
  const [items, setItems] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ] as Array<string>);

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
