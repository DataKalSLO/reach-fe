import React from 'react';
import { Button, styled } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';
import GoogleIcon from '../icons/GoogleIcon';
import BoxCenter from '../common/components/BoxCenter';

function ThirdPartyCreateAccount() {
  return (
    <BoxCenterSized>
      <StyledButton fullWidth variant="outlined" endIcon={<GoogleIcon />}>
        Continue with Google
      </StyledButton>
      <StyledButton fullWidth variant="outlined" endIcon={<AppleIcon />}>
        Continue with Apple
      </StyledButton>
    </BoxCenterSized>
  );
}

const StyledButton = styled(Button)({
  width: '270px',
  height: '50px'
});

const BoxCenterSized = styled(BoxCenter)({
  height: '115px',
  width: '200px'
});

export default ThirdPartyCreateAccount;
