import React from 'react';
import { Grid, Button, Box, styled } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';
import GoogleIcon from '../icons/GoogleIcon';

function ThirdPartyCreateAccount() {
  return (
    <Box>
      <Grid container item direction="column" alignItems="center" spacing={3}>
        <Grid item md={12}>
          <StyledButton fullWidth variant="outlined" endIcon={<GoogleIcon />}>
            Continue with Google
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton fullWidth variant="outlined" endIcon={<AppleIcon />}>
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

export default ThirdPartyCreateAccount;
