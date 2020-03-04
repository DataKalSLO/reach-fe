import React from 'react';
import { Box, TextField, Button, styled } from '@material-ui/core';

function ReachSignIn() {
  return (
    <SignInBox>
      <InputTextField placeholder="Email Address" fullWidth variant="filled" />
      <InputTextField
        placeholder="Password"
        type="password"
        fullWidth
        variant="filled"
      />
      <StyledButton variant="outlined" fullWidth>
        LOG IN
      </StyledButton>
    </SignInBox>
  );
}

const paddingDefault = '40px';

const InputTextField = styled(TextField)({
  height: '40px'
});

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

const StyledButton = styled(Button)({
  backgroundColor: 'rgba(0, 154, 138, 0.6)'
});

export default ReachSignIn;
