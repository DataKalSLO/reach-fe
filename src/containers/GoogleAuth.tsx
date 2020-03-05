import React from 'react';
import { GoogleLoginButton } from 'ts-react-google-login-component';
import { Button, styled } from '@material-ui/core';
import GoogleIcon from '../icons/GoogleIcon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginData } from '../redux/login/types';
import { loginUser } from '../redux/login/actions';
import { register } from '../redux/login/actions';
import { RegisterData } from '../redux/login/types';
import { HOME } from '../nav/constants';

const GoogleAuth = (props: { isRegistration: boolean }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const clientConfig = {
    // eslint-disable-next-line
    client_id:
      '771819856575-fs38pckfuc7oipvt6fr0tnugr2dlbusl.apps.googleusercontent.com'
  };

  const responseGoogle = (googleUser: gapi.auth2.GoogleUser): void => {
    if (props.isRegistration) {
      dispatch(
        register({
          email: googleUser.getBasicProfile().getEmail(),
          password: googleUser.getId(),
          name: googleUser.getBasicProfile().getName(),
          role: 'BaseUser'
        } as RegisterData)
      );
    } else {
      dispatch(
        loginUser({
          email: googleUser.getBasicProfile().getEmail(),
          password: googleUser.getId()
        } as LoginData)
      );
    }
    history.push(HOME);
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
