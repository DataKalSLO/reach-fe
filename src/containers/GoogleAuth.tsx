import React, { useCallback } from 'react';
import { GoogleLoginButton } from 'ts-react-google-login-component';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginData, RegisterData } from '../redux/login/types';
import { loginUser, register } from '../redux/login/actions';
import { HOME } from '../nav/constants';
import GoogleBtn from '../icons/btn_google_signin_dark_normal_web.png';

const GoogleAuth = (props: { isRegistration: boolean }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const clientConfig = {
    // eslint-disable-next-line
    client_id:
      '771819856575-fs38pckfuc7oipvt6fr0tnugr2dlbusl.apps.googleusercontent.com'
  };

  const responseGoogle = useCallback(
    (googleUser: gapi.auth2.GoogleUser): void => {
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
    },
    [dispatch, history, props.isRegistration]
  );

  return (
    <GoogleLoginButton
      classNames="custom_class center-block"
      responseHandler={responseGoogle}
      clientConfig={clientConfig}
      failureHandler={error => {
        console.error(error);
      }}
    >
      <img src={GoogleBtn} alt="Sign in with Google" />
    </GoogleLoginButton>
  );
};

export default GoogleAuth;
