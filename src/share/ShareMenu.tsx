import { Facebook, LinkedIn, Twitter } from '@material-ui/icons';
import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from 'react-share';
import ListItemButton from '../common/components/ListItemButton';
import { Menu } from '../reach-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

interface ShareMenuProps {
  shareURL: string;
  title: string;
  // props for menu
  id: string;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  closeMenuCallback: () => void;
  marginTop?: string; // used to control the vertical offset from the top of the button to the top of the menu
}

export default function ShareMenu(props: ShareMenuProps) {
  return (
    <Menu
      id="story-status-menu"
      anchorEl={props.anchorEl}
      setAnchorEl={props.setAnchorEl}
      open={Boolean(props.anchorEl)}
      marginTop="40px"
    >
      <MenuItem onClick={props.closeMenuCallback}>
        <FacebookShareButton url={props.shareURL}>
          <ListItemButton icon={<Facebook />} text="Share to Facebook" />
        </FacebookShareButton>
      </MenuItem>
      <MenuItem onClick={props.closeMenuCallback}>
        <TwitterShareButton
          url={props.shareURL}
          title={props.title}
          via="REACH"
        >
          <ListItemButton icon={<Twitter />} text="Share to Twitter" />
        </TwitterShareButton>
      </MenuItem>
      <MenuItem onClick={props.closeMenuCallback}>
        <LinkedinShareButton
          url={props.shareURL}
          title={props.title}
          summary="REACH"
        >
          <ListItemButton icon={<LinkedIn />} text="Share to LinkedIn" />
        </LinkedinShareButton>
      </MenuItem>
    </Menu>
  );
}
