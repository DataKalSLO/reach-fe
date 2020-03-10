import React, { useEffect } from 'react';
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { ReactFacebookLoginInfo } from 'react-facebook-login';

export enum FacebookLoginButtonStyle {
  LoginWith = 'login_with',
  ContinueWith = 'continue_with'
}

export type FacebookLoginProps = {
  style: FacebookLoginButtonStyle;
};

function FacebookLogin({ style }: FacebookLoginProps) {
  return (
    <ReactFacebookLogin
      appId="663110434494643"
      callback={(response: ReactFacebookLoginInfo) => console.log(response)}
      render={(_: object) => {
        return <LoginButton style={style} />;
      }}
    />
  );
}

// This is an ugly hack to make sure Facebook's asynchronously-loaded SDK
// is accessible via the component below.
// Typescript otherwise fails to acknowledge `window.FB`, since it exists only at runtime.
declare const window: { FB: { XFBML: { parse(): void } } };

// Styling pulled from Facebook's asynchronously-loaded SDK.
function LoginButton({ style }: FacebookLoginProps) {
  // Force Facebook's SDK to parse the element.
  // Without performing this side effect, the button will not show until refreshing.
  useEffect(() => {
    if (window.FB !== undefined) {
      window.FB.XFBML.parse();
    }
  });

  return (
    <div
      className="fb-login-button"
      data-width=""
      data-size="large"
      data-button-type={style}
      data-auto-logout-link="false"
      data-use-continue-as="false"
    ></div>
  );
}

export default FacebookLogin;
