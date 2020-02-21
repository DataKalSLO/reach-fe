import React, { useState } from 'react';
import { Grid, Button, Box, styled } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';

function AlternateCreateAccount() {
  const [placeholderVal, setPlaceholderVal] = useState('Email Address');

  return (
    <Box>
      <Grid container item direction="column" alignItems="center" spacing={3}>
        <Grid item md={12}>
          <StyledButton
            fullWidth
            className="button-height"
            variant="outlined"
            endIcon={<FacebookIcon />}
          >
            Continue with Google
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton
            fullWidth
            className="button-height"
            variant="outlined"
            endIcon={<AppleIcon />}
          >
            Continue with Apple
          </StyledButton>
        </Grid>
      </Grid>
    </Box>
  );
}

const StyledButton = styled(Button)({
  minWidth: '270px',
  minHeight: '50px'
});

export default AlternateCreateAccount;
