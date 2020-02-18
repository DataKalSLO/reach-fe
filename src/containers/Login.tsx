import React from 'react';
import { Grid } from '@material-ui/core';
import GoogleSignIn from './GoogleSignIn';

function Login() {
  return (
    <Grid
      direction="row"
      justify="center"
      alignItems="center"
      item
      container
      xs={12}
    >
      <GoogleSignIn />
    </Grid>
  );
}

export default Login;
