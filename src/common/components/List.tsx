import { List as CoreList } from '@material-ui/core';
import React from 'react';

interface Props {
  children: JSX.Element[];
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function List(props: Props) {
  return <CoreList {...props}>{props.children}</CoreList>;
}
