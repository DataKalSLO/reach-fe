import React from 'react';
import Button from '@material-ui/core/Button';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { LinkedinShareButton } from 'react-share';

export default function LinkedInButton(props: any) {
  return (
    <Button>
      <LinkedinShareButton title="Title" summary="Summary" url={props.graphUrl}>
        <LinkedInIcon />
      </LinkedinShareButton>
    </Button>
  );
}
