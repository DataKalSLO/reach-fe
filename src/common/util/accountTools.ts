import { User } from '../../redux/login/types';
import { Auth } from 'aws-amplify';
import {
  CognitoUser,
  CognitoUserSession,
  CognitoIdToken,
  CognitoAccessToken
} from 'amazon-cognito-identity-js';

export async function getCurrentUser(): Promise<User> {
  return new Promise((resolve, reject) => {
    Auth.currentSession().then((sessionInfo: CognitoUserSession) => {
      const accessToken: CognitoAccessToken = sessionInfo.getAccessToken();
      const idToken: CognitoIdToken = sessionInfo.getIdToken();
      resolve({
        email: idToken.payload.email,
        name: idToken.payload.name,
        token: accessToken.getJwtToken(),
        'custom:role': idToken.payload['custom:role'],
        'custom:occupation': idToken.payload['custom:occupation'],
        'custom:emailNotif': idToken.payload['custom:emailNotif']
      });
    });
  });
}
