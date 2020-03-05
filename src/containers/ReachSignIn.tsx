import React from 'react';
import { Box, Button, styled } from '@material-ui/core';
import AccountTextField from '../common/components/AccountTextField';

function ReachSignIn() {
  return (
    <SignInBox>
      <AccountTextField
        placeholder="Email Address"
        fullWidth
        variant="filled"
        size="small"
      />
      <AccountTextField
        placeholder="Password"
        type="password"
        fullWidth
        variant="filled"
        size="small"
      />
      <StyledButton variant="contained" fullWidth color="primary">
        LOG IN
      </StyledButton>
    </SignInBox>
  );
}

const paddingDefault = '40px';

const SignInBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'space-around',
  paddingLeft: paddingDefault,
  paddingRight: paddingDefault,
  height: '215px',
  width: '270px'
});

const StyledButton = styled(Button)({
  margin: '15px'
});

export default ReachSignIn;
