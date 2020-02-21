import React, { useState } from 'react';
import { Grid, Button, Box } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';
import './OtherCreateAccountForm.css';

function OtherCreateAccountForm() {
  const [placeholderVal, setPlaceholderVal] = useState('Email Address');

  return (
    <Box>
      <Grid container item direction="column" alignItems="center" spacing={3}>
        <Grid item md={12}>
          <div className="button-width">
            <Button
              fullWidth
              className="button-height"
              variant="outlined"
              endIcon={<FacebookIcon />}
            >
              Continue with Google
            </Button>
          </div>
        </Grid>
        <Grid item>
          <div className="button-width">
            <Button
              fullWidth
              className="button-height"
              variant="outlined"
              endIcon={<AppleIcon />}
            >
              Continue with Apple
            </Button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OtherCreateAccountForm;
