import React from 'react';
import { Grid, Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';

// A component to handle signing in using existing Social Media Accounts
function SocialMediaSignIn() {
  return (
    <Grid
      container
      item
      justify="space-around"
      direction="column"
      xs={3}
      spacing={3}
    >
      <GoogleSignIn />
      <AppleSignIn />
    </Grid>
  );
}

const GoogleSignIn = () => {
  return (
    <Grid item>
      <Button endIcon={<FacebookIcon />} fullWidth={true}>
        Continue with Google
      </Button>
    </Grid>
  );
};

const AppleSignIn = () => {
  return (
    <Grid item>
      <Button endIcon={<AppleIcon />} fullWidth={true}>
        Continue with Apple
      </Button>
    </Grid>
  );
};

export default SocialMediaSignIn;
