import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { GoogleLoginButton } from 'ts-react-google-login-component';

const GoogleSignIn = () => {
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

  return (
    <GoogleLoginButton
      classNames="custom_class center-block"
      
      responseHandler={responseGoogle}
      clientConfig={clientConfig}
      failureHandler={errorHandler}
    >
      <Button endIcon={<FacebookIcon />}>Continue with Google</Button>
    </GoogleLoginButton>
  );
};

export default GoogleSignIn;
