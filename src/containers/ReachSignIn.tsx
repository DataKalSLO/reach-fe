import React from 'react';
import { Box, TextField, Button, styled } from '@material-ui/core';

function ReachSignIn() {
  return (
    <SignInBox>
      <InputTextField
        placeholder="Email Address"
        fullWidth
        variant="filled"
        size="small"
      />
      <InputTextField
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

const InputTextField = styled(TextField)({
  opacity: '50%',
  height: '30px'
});

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
