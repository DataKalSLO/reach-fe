import React from 'react';
import { Grid, Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';

function OtherSignIn() {
  return (
    <Grid container item direction="column" xs={3} spacing={3}>
      <Grid item>
        <Button endIcon={<FacebookIcon />} fullWidth={true}>
          Comtinue with Google
        </Button>
      </Grid>
      <Grid item>
        <Button endIcon={<AppleIcon />} fullWidth={true}>
          Continue with Apple
        </Button>
      </Grid>
      <Grid item>
        <Button endIcon={<FacebookIcon />} fullWidth={true}>
          Continue with Facebook
        </Button>
      </Grid>
    </Grid>
  );
}

export default OtherSignIn;
