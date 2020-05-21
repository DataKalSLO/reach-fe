import React, { useState } from 'react';
import List from '../../../common/components/List';
import ListItemButton from '../../../common/components/ListItemButton';
import { Collapse, ListItem, styled } from '@material-ui/core';
import { theme } from '../../../theme/theme';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

export interface Props {
  label: string;
  children: JSX.Element[] | JSX.Element;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function FormCollapsibleBlock(props: Props) {
  const { label, icon, children, onClick, ...otherProps } = props;
  const [open, setOpen] = useState(false);

  return (
    <List {...otherProps}>
      <ListItemButton
        icon={open ? <ExpandLess /> : <ExpandMore />}
        text={label}
        onClick={() => setOpen(!open)}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </List>
  );
}
