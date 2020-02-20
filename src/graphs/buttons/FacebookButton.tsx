import React from 'react';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import { FacebookShareButton } from 'react-share';
import ToolbarButtonProps from '../Toolbar';

export default function FacebookButton(props: ToolbarButtonProps) {
  return (
    <Button>
      <FacebookShareButton url={props.graphUrl}>
        <FacebookIcon />
      </FacebookShareButton>
    </Button>
  );
}
