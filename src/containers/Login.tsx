import React from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login';
import { Grid } from '@material-ui/core';

const responseGoogle = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
) => {
  console.log(response);
};

function Login() {
  return (
    <Grid
      direction="row"
      justify="center"
      alignItems="center"
      item
      container
      xs={12}
    >
      <GoogleLogin
        clientId="771819856575-fs38pckfuc7oipvt6fr0tnugr2dlbusl.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      ></GoogleLogin>
    </Grid>
  );
}

export default Login;
