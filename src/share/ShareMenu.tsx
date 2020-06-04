import { Box, Divider } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Facebook, LinkedIn, Twitter } from '@material-ui/icons';
import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from 'react-share';
import { Menu } from '../reach-ui/core';

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

const useStyles = makeStyles({
  text: {
    paddingLeft: '20px'
  }
});

export default function ShareMenu(props: ShareMenuProps) {
  const classes = useStyles();

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
          <Box display="flex">
            <Facebook />
            <span className={classes.text}>Share to Facebook</span>
          </Box>
        </FacebookShareButton>
      </MenuItem>
      <Divider />
      <MenuItem onClick={props.closeMenuCallback}>
        <TwitterShareButton
          url={props.shareURL}
          title={props.title}
          via="REACH"
        >
          <Box display="flex">
            <Twitter />
            <span className={classes.text}>Share to Twitter</span>
          </Box>
        </TwitterShareButton>
      </MenuItem>
      <Divider />
      <MenuItem onClick={props.closeMenuCallback}>
        <LinkedinShareButton
          url={props.shareURL}
          title={props.title}
          summary="REACH"
        >
          <Box display="flex">
            <LinkedIn />
            <span className={classes.text}>Share to LinkedIn</span>
          </Box>
        </LinkedinShareButton>
      </MenuItem>
    </Menu>
  );
}
