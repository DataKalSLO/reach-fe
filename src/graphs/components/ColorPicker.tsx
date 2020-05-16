import React, { Fragment, useState } from 'react';
import { FormControlLabel, Button, Popover } from '@material-ui/core';
import { ChromePicker } from 'react-color';
import { ColorResult, ColorChangeHandler } from 'react-color';

interface Props {
  color: string;
  handleChange: ColorChangeHandler;
}

export default function ColorPicker(props: Props) {
  const [state, setState] = useState(props.color);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <FormControlLabel
        control={
          <Button
            variant="contained"
            style={{
              backgroundColor: state,
              margin: '12px'
            }}
            onClick={handleClick}
          />
        }
        labelPlacement="bottom"
        label="Series Color"
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
          color={state}
          onChangeComplete={props.handleChange}
          onChange={(color: ColorResult) => setState(color.hex)}
        />
      </Popover>
    </Fragment>
  );
}
