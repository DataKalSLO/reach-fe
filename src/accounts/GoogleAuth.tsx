import React, { useCallback } from 'react';
import { GoogleLoginButton } from 'ts-react-google-login-component';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginData, RegisterData } from '../redux/login/types';
import { loginUser, register } from '../redux/login/actions';
import { wrapWithCatch } from '../api/base';
import { HOME } from '../nav/constants';
import './GoogleAuth.scss';

export enum GoogleAuthButtonType {
  SignIn = 'Sign in with Google',
  Register = 'Continue with Google'
}

export enum UserRoles {
  defaultRole = 'BaseUser',
  adminRole = 'Admin'
}

const GoogleAuth = (props: { style: GoogleAuthButtonType }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const clientConfig = {
    // This is a public id, not meant to be secret
    // eslint-disable-next-line
    client_id:
      '771819856575-fs38pckfuc7oipvt6fr0tnugr2dlbusl.apps.googleusercontent.com'
  };

  const registerAccount = useCallback(
    (email: string, password: string, name: string, role: string) =>
      register({
        email,
        password,
        name,
        role
      } as RegisterData),
    []
  );

  const loginAccount = useCallback(
    (email: string, password: string) =>
      loginUser({
        email,
        password
      } as LoginData),
    []
  );

  const registerThenLogin = useCallback(
    (email: string, password: string, name: string, role: string) => {
      dispatch(registerAccount(email, password, name, role));
      dispatch(loginAccount(email, password));
    },
    [dispatch, registerAccount, loginAccount]
  );

  const responseGoogle = useCallback(
    (googleUser: gapi.auth2.GoogleUser): void => {
      const email = googleUser.getBasicProfile().getEmail();
      const id = googleUser.getId();
      const name = googleUser.getBasicProfile().getName();
      // if the google button is continue with, try to register the user first, if not
      // just try to sign them in
      if (props.style === GoogleAuthButtonType.Register) {
        dispatch(
          wrapWithCatch(
            registerAccount(email, id, name, UserRoles.defaultRole),
            () => dispatch(loginAccount(email, id))
          )
        );
      } else {
        dispatch(
          wrapWithCatch(loginAccount(email, id), () =>
            registerThenLogin(email, id, name, UserRoles.defaultRole)
          )
        );
      }
      history.push(HOME);
    },
    [
      dispatch,
      history,
      props.style,
      registerThenLogin,
      registerAccount,
      loginAccount
    ]
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
      <button type="button" className="google-button">
        <span className="google-button__icon">
          <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
              id="Shape"
              fill="#EA4335"
            />
            <path
              d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
              id="Shape"
              fill="#FBBC05"
            />
            <path
              d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
              id="Shape"
              fill="#4285F4"
            />
            <path
              d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
              fill="#34A853"
            />
          </svg>
        </span>
        <span className="google-button__text">{props.style}</span>
      </button>
    </GoogleLoginButton>
  );
};

export default GoogleAuth;
