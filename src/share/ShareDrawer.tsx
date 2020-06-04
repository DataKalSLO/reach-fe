import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import { Clear, Facebook, LinkedIn, Twitter } from '@material-ui/icons';
import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from 'react-share';
import List from '../common/components/List';
import ListItemButton from '../common/components/ListItemButton';

interface ShareDrawerProps {
  closeCallback: () => void;
  openCallback: () => void;
  isOpen: boolean;
  shareURL: string;
}

export default function ShareDrawer(props: ShareDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={props.isOpen}
      onClose={() => props.closeCallback()}
    >
      <Box width={250}>
        <List>
          <FacebookShareButton url={props.shareURL}>
            <ListItemButton icon={<Facebook />} text="Share to Facebook" />
          </FacebookShareButton>
          <TwitterShareButton
            url={props.shareURL}
            title="Insert graph title here"
            via="REACH"
          >
            <ListItemButton icon={<Twitter />} text="Share to Twitter" />
          </TwitterShareButton>
          <LinkedinShareButton
            url={props.shareURL}
            title="Insert graph title here"
            summary="Insert graph description here"
          >
            <ListItemButton icon={<LinkedIn />} text="Share to LinkedIn" />
          </LinkedinShareButton>
          <ListItemButton
            onClick={() => props.closeCallback()}
            icon={<Clear />}
            text="Exit"
          />
        </List>
      </Box>
    </Drawer>
  );
}
