import React, { useState } from 'react';
import { ColorResult } from 'react-color';
import ColorPicker from '../ColorPicker';
import { Button, styled } from '@material-ui/core';
import LensIcon from '@material-ui/icons/Lens';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { isNull } from 'util';

interface Props {
  initialColor: string;
  handleChange: (color: ColorResult) => void;
}

export default function FormColorPicker(props: Props) {
  const [color, setColor] = useState(props.initialColor);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  return (
    <ColorPicker
      color={color}
      anchorEl={anchorEl}
      handleChangeComplete={props.handleChange}
      handleChange={handleChange}
      handleClose={handleClose}
    >
      <ColorButton
        onClick={handleClick}
        variant="outlined"
        size="large"
        startIcon={<LensIcon style={{ fill: color }} />}
      >
        {isNull(anchorEl) ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
      </ColorButton>
    </ColorPicker>
  );
}

const ColorButton = styled(Button)({
  paddingRight: '5px',
  margin: '10px'
});
