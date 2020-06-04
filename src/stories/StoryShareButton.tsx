import { Share } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import React from 'react';
import ShareMenu from '../share/ShareMenu';

interface StoryShareButtonProps {
  shareURL: string;
  storyTitle: string;
}

export default function StoryShareButton(props: StoryShareButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <span>
      <Button
        aria-controls="story-share-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Share />
      </Button>
      <ShareMenu
        id="story-share-menu"
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        shareURL={props.shareURL}
        title={props.storyTitle}
        closeMenuCallback={handleClose}
      />
    </span>
  );
}
