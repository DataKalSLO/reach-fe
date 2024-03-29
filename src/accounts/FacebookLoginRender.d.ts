// The implementation of this module already exists; however, it lacks a typed module definition.
// These type definitions are taken from @types/react-facebook-login, with an added `render` prop
// to support Facebook's preferred button styling.
// See https://github.com/keppelen/react-facebook-login/issues/284.

declare module 'react-facebook-login/dist/facebook-login-render-props' {
  import * as React from 'react';

  export interface ReactFacebookLoginProps {
    appId: string;
    callback(userInfo: ReactFacebookLoginInfo): void;
    onFailure?(response: ReactFacebookFailureResponse): void;

    autoLoad?: boolean;
    buttonStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    cookie?: boolean;
    cssClass?: string;
    disableMobileRedirect?: boolean;
    fields?: string;
    icon?: React.ReactNode;
    isDisabled?: boolean;
    language?: string;
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    reAuthenticate?: boolean;
    redirectUri?: string;
    scope?: string;
    size?: 'small' | 'medium' | 'metro';
    textButton?: string;
    typeButton?: string;
    version?: string;
    xfbml?: boolean;
    isMobile?: boolean;
    tag?: Node | React.Component<object>;
    returnScopes?: boolean;
    state?: string;
    authType?: string;
    responseType?: string;
    render?(): void;
  }

  export interface ReactFacebookFailureResponse {
    status?: string;
  }

  export interface ReactFacebookLoginInfo {
    id: string;
    accessToken: string;
    name?: string;
    email?: string;
    picture?: {
      data: {
        height?: number;
        is_silhouette?: boolean;
        url?: string;
        width?: number;
      };
    };
  }

  export interface ReactFacebookLoginState {
    isSdkLoaded?: boolean;
    isProcessing?: boolean;
  }

  export default class ReactFacebookLogin extends React.Component<
    ReactFacebookLoginProps,
    ReactFacebookLoginState
  > {}
}
