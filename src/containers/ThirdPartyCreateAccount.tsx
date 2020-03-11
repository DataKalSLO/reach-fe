import React from 'react';
import { Button, styled } from '@material-ui/core';
import GoogleIcon from '../icons/GoogleIcon';
import BoxCenter from '../common/components/BoxCenter';
import FacebookLogin, { FacebookLoginButtonStyle } from './FacebookLogin';

function ThirdPartyCreateAccount() {
  return (
    <BoxCenterSized>
      <StyledButton fullWidth variant="outlined" endIcon={<GoogleIcon />}>
        Continue with Google
      </StyledButton>
      <FacebookLogin style={FacebookLoginButtonStyle.ContinueWith} />
    </BoxCenterSized>
  );
}

const StyledButton = styled(Button)({
  width: '270px',
  height: '50px'
});

const BoxCenterSized = styled(BoxCenter)({
  justifyContent: 'space-around',
  height: '200px',
  width: '200px'
});

export default ThirdPartyCreateAccount;
