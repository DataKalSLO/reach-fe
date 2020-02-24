import React from 'react';
import Button from '@material-ui/core/Button';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { LinkedinShareButton } from 'react-share';
import ToolbarButtonProps from '../ShareSheet';

export default function LinkedInButton(props: ToolbarButtonProps) {
  return (
    <Button>
      <LinkedinShareButton title="Title" summary="Summary" url={props.graphUrl}>
        <LinkedInIcon />
      </LinkedinShareButton>
    </Button>
  );
}
