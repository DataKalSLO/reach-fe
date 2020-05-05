import {
  ListItem as CoreListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import React from 'react';

interface Props {
  'aria-label': string;
  icon: JSX.Element;
  primarylabel?: string;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function ListItemButton(props: Props) {
  return (
    <CoreListItem
      button
      aria-label={props['aria-label']}
      key={props['aria-label']}
      {...props}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      {props.primarylabel ? (
        <ListItemText primary={props.primarylabel} />
      ) : null}
    </CoreListItem>
  );
}
