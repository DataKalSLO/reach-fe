import React from 'react';
import { Button, styled } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';
import BoxCenter from '../common/components/BoxCenter';
import GoogleAuth from './GoogleAuth';

function ThirdPartyCreateAccount() {
  return (
    <BoxCenterSized>
      <GoogleAuth isRegistration={true} />
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
