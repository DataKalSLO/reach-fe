import React from 'react';
import { styled } from '@material-ui/core';
import BoxCenter from '../common/components/BoxCenter';
import GoogleAuth, { GoogleLoginButtonStyle } from './GoogleAuth';
import FacebookLogin, { FacebookLoginButtonStyle } from './FacebookLogin';

function ThirdPartyCreateAccount() {
  return (
    <BoxCenterSized>
      <GoogleAuth style={GoogleLoginButtonStyle.ContinueWith} />
      <FacebookLogin style={FacebookLoginButtonStyle.ContinueWith} />
    </BoxCenterSized>
  );
}

const BoxCenterSized = styled(BoxCenter)({
  justifyContent: 'space-around',
  height: '200px',
  width: '200px'
});

export default ThirdPartyCreateAccount;
