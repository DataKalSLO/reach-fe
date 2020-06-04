import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { Menu } from '../../reach-ui/core';

export default function StoryStatusMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="story-status-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="story-status-menu"
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={Boolean(anchorEl)}
        marginTop="40px"
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
}
