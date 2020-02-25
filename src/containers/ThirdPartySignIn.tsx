import React from 'react';
import { Grid, Button } from '@material-ui/core';

import { Facebook, Apple } from '@material-ui/icons';

// A component to handle signing in using existing Social Media Accounts
function ThirdPartySignIn() {
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
      <Button endIcon={<Facebook />} fullWidth={true}>
        Continue with Google
      </Button>
    </Grid>
  );
};

const AppleSignIn = () => {
  return (
    <Grid item>
      <Button endIcon={<Apple />} fullWidth={true}>
        Continue with Apple
      </Button>
    </Grid>
  );
};

export default ThirdPartySignIn;
