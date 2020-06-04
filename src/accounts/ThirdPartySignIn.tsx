import React from 'react';
import { styled } from '@material-ui/core';
import BoxCenter from '../common/components/BoxCenter';
import GoogleAuth, { GoogleAuthButtonType } from './GoogleAuth';

// A component to handle signing in using existing Social Media Accounts
function ThirdPartySignIn() {
  return (
    <ThirdPartyBox>
      <GoogleAuth style={GoogleAuthButtonType.SignIn} />
    </ThirdPartyBox>
  );
}

const paddingDefault = '40px';

const ThirdPartyBox = styled(BoxCenter)({
  paddingLeft: paddingDefault,
  paddingRight: paddingDefault,
  width: '270px',
  height: '80px'
});

export default ThirdPartySignIn;
