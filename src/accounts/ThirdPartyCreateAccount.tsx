import React from 'react';
import { styled } from '@material-ui/core';
import BoxCenter from '../common/components/BoxCenter';
import GoogleAuth, { GoogleAuthButtonType } from './GoogleAuth';

function ThirdPartyCreateAccount() {
  return (
    <BoxCenterSized>
      <GoogleAuth style={GoogleAuthButtonType.Register} />
    </BoxCenterSized>
  );
}

const BoxCenterSized = styled(BoxCenter)({
  justifyContent: 'space-around',
  height: '200px',
  width: '200px'
});

export default ThirdPartyCreateAccount;
