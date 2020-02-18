import React from 'react';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import { TwitterShareButton } from 'react-share';

export default function TwitterButton(props: any) {
  return (
    <Button>
      <TwitterShareButton title="Title" via="Author" url={props.graphUrl}>
        <TwitterIcon />
      </TwitterShareButton>
    </Button>
  );
}
