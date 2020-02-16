import React, { useState } from 'react';
import { Grid, Button, TextField, Box } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';

function OtherCreateAccountForm() {
  const [placeholderVal, setPlaceholderVal] = useState('Email Address');

  return (
    <Box>
    <Grid container item
      direction="column" 
      alignItems="center"
      spacing={3}
    >
        
      <Grid item md={12}>
        <Button variant="outlined" endIcon={<FacebookIcon/>}>Continue with Google</Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" endIcon={<AppleIcon/>}>Continue with Apple</Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" endIcon={<FacebookIcon/>}>Continue with Facebook</Button>
      </Grid>
      
    
    </Grid>
    </Box>
  );
}

export default OtherCreateAccountForm;