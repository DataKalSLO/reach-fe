import { Popover } from '@material-ui/core';
import React, { Fragment, ReactNode } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
interface Props {
  color: string;
  anchorEl: HTMLButtonElement | null;
  children: ReactNode;
  handleChange: (color: ColorResult) => void;
  handleChangeComplete: (color: ColorResult) => void;
  handleClose: () => void;
}

export default function ColorPicker(props: Props) {
  const open = Boolean(props.anchorEl);

  return (
    <Fragment>
      {props.children}
      <Popover
        open={open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <ChromePicker
          disableAlpha={true}
          color={props.color}
          onChangeComplete={props.handleChangeComplete}
          onChange={props.handleChange}
        />
      </Popover>
    </Fragment>
  );
}
