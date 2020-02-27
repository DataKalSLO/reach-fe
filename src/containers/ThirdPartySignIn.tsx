import React from 'react';
import { Grid, Button, styled } from '@material-ui/core';
import { Apple } from '@material-ui/icons';

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
      <AppleSignIn />
    </Grid>
  );
}

const AppleSignIn = () => {
  return (
    <Grid item>
      <StyledButton endIcon={<Apple />} fullWidth variant="outlined">
        Continue with Apple
      </StyledButton>
    </Grid>
  );
};

const StyledButton = styled(Button)({
  width: '270px',
  height: '50px'
});

export default ThirdPartySignIn;
