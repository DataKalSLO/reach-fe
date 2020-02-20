import React from "react";
import { Button } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { GoogleLoginButton } from "ts-react-google-login-component";

const responseGoogle = (googleUser: GoogleUser): void => {
  const id_token = googleUser.getAuthResponse(true).id_token;
  const googleId = googleUser.getId();

  console.log({ googleId });
  console.log({ accessToken: id_token });
  // Make user login in your system
  // login success tracking...
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
      accessType="online"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default GoogleSignIn;
