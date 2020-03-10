import React from 'react';
import { styled } from '@material-ui/core';
import BoxCenter from '../common/components/BoxCenter';
import GoogleAuth from './GoogleAuth';
import FacebookLogin, { FacebookLoginButtonStyle } from './FacebookLogin';

// A component to handle signing in using existing Social Media Accounts
function ThirdPartySignIn() {
  return (
    <ThirdPartyBox>
      <GoogleAuth isRegistration={false} />
      <FacebookLogin style={FacebookLoginButtonStyle.LoginWith} />
    </ThirdPartyBox>
  );
}

const paddingDefault = '40px';

const ThirdPartyBox = styled(BoxCenter)({
  paddingLeft: paddingDefault,
  paddingRight: paddingDefault,
  width: '270px',
  height: '115px'
});

export default ThirdPartySignIn;
