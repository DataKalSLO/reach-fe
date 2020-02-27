import React from 'react';
import { Box, TextField, Button, styled } from '@material-ui/core';

function SignIn() {
  return (
    <SignInBox>
      <TextField placeholder="Email Address" fullWidth />
      <TextField placeholder="Password" type="password" fullWidth />
      <Button variant="outlined" fullWidth>
        LOG IN
      </Button>
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
  height: '200px',
  width: '270px'
});

export default SignIn;
