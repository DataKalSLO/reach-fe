import React from 'react';
import { Button, Box, styled } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';
import GoogleIcon from '../icons/GoogleIcon';

function ThirdPartyCreateAccount() {
  return (
    <BoxCenter>
      <StyledButton fullWidth variant="outlined" endIcon={<GoogleIcon />}>
        Continue with Google
      </StyledButton>
      <StyledButton fullWidth variant="outlined" endIcon={<AppleIcon />}>
        Continue with Apple
      </StyledButton>
    </BoxCenter>
  );
}

const StyledButton = styled(Button)({
  minWidth: '270px',
  minHeight: '50px'
});

const BoxCenter = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'space-between',
  height: '115px',
  width: '200px'
});

export default ThirdPartyCreateAccount;
