import React from 'react';
import { Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login';

const responseGoogle = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
) => {
  console.log(response);
};

function GoogleSignIn() {
  return (
    <GoogleLogin
      clientId="771819856575-fs38pckfuc7oipvt6fr0tnugr2dlbusl.apps.googleusercontent.com"
      render={renderProps => (
        <Button
          endIcon={<FacebookIcon />}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Continue with Google
        </Button>
      )}
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleSignIn;
