import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

function SignIn() {
  return (
    <Grid container item direction="column" xs={3} spacing={3}>
      <Grid item>
        <TextField placeholder="Email Address" fullWidth={true} />
      </Grid>
      <Grid item>
        <TextField placeholder="Password" type="password" fullWidth={true} />
      </Grid>
      <Grid item>
        <Button variant="outlined" fullWidth={true}>
          LOG IN
        </Button>
      </Grid>
    </Grid>
  );
}

export default SignIn;
