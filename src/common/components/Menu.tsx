import { Menu as CoreMenu } from '@material-ui/core';
import React from 'react';

// Referenced from https://material-ui.com/components/menus/#simple-menu

interface Props {
  id: string;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  marginTop?: string; // used to control the vertical offset from the top of the button to the top of the menu
  children: JSX.Element[];
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function Menu(props: Props) {
  const { marginTop, setAnchorEl, ...otherProps } = props;

  const handleClose = () => {
    props.setAnchorEl(null);
  };

  return (
    <CoreMenu
      id={props.id}
      anchorEl={props.anchorEl}
      open={Boolean(props.anchorEl)}
      onClose={handleClose}
      style={{ marginTop: props.marginTop }}
      {...otherProps}
    >
      {props.children}
    </CoreMenu>
  );
}
