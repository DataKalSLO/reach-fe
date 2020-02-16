import React, { useState } from 'react';
import { Grid, Button, TextField, Box } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';

function CreateAccountForm() {
  const [placeholderVal, setPlaceholderVal] = useState('Email Address');

  return (
    <Box component="span">
      <Grid container
        direction="column" 
        alignItems="center"
        spacing={3}
      >
        <Grid item md={12}>
            <TextField placeholder="Email Address"/>
        </Grid>
        <Grid item>
          <TextField placeholder="Password" type="password" />
        </Grid>
        <Grid item>
          <Button variant="outlined">CREATE ACCOUNT</Button>
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default CreateAccountForm;