import React, { useState } from 'react';
import { GoogleLoginButton } from 'ts-react-google-login-component';
import { Grid, Button, styled } from '@material-ui/core';
import GoogleIcon from '../icons/GoogleIcon';

const GoogleAuth = () => {
  const [googleId, setGoogleId] = useState('');

  const clientConfig = {
    // eslint-disable-next-line
    client_id:
      '771819856575-fs38pckfuc7oipvt6fr0tnugr2dlbusl.apps.googleusercontent.com'
  };

  const responseGoogle = (googleUser: gapi.auth2.GoogleUser): void => {
    // eslint-disable-next-line
    const id_token = googleUser.getAuthResponse(true).id_token;
    setGoogleId(googleUser.getId());

    console.log(googleUser.getId());
    // eslint-disable-next-line
    console.log({ accessToken: id_token });
  };

  const errorHandler = (error: string): void => {
    console.error(error);
  };

  const StyledButton = styled(Button)({
    width: '270px',
    height: '50px'
  });

  return (
    <GoogleLoginButton
      classNames="custom_class center-block"
      responseHandler={responseGoogle}
      clientConfig={clientConfig}
      failureHandler={errorHandler}
    >
      <StyledButton endIcon={<GoogleIcon />} fullWidth variant="outlined">
        Continue with Google
      </StyledButton>
    </GoogleLoginButton>
  );
};

export default GoogleAuth;
