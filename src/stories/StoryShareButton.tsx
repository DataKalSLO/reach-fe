import React from 'react';
import { IconButton } from '../reach-ui/core';
import { SHARE_ICON } from '../reach-ui/icons';
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
      <IconButton
        aria-controls="story-share-menu"
        aria-haspopup="true"
        aria-label="share"
        icon={SHARE_ICON}
        onClick={handleClick}
      />

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
