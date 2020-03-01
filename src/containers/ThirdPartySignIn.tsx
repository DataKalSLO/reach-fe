import React from 'react';
import { Button, styled } from '@material-ui/core';
import { Apple } from '@material-ui/icons';
import BoxCenter from '../common/components/BoxCenter';
import GoogleIcon from '../icons/GoogleIcon';

// A component to handle signing in using existing Social Media Accounts
function ThirdPartySignIn() {
  return (
    <ThirdPartyBox>
      <GoogleSignIn />
      <AppleSignIn />
    </ThirdPartyBox>
  );
}

const GoogleSignIn = () => {
  return (
    <StyledButton endIcon={<GoogleIcon />} fullWidth variant="outlined">
      Continue with Google
    </StyledButton>
  );
};

const AppleSignIn = () => {
  return (
    <StyledButton endIcon={<Apple />} fullWidth variant="outlined">
      Continue with Apple
    </StyledButton>
  );
};

const paddingDefault = '40px';

const ThirdPartyBox = styled(BoxCenter)({
  paddingLeft: paddingDefault,
  paddingRight: paddingDefault,
  width: '270px',
  height: '115px'
});

const StyledButton = styled(Button)({
  width: '270px',
  height: '50px'
});

export default ThirdPartySignIn;