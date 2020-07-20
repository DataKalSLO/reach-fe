import { User } from '../../redux/login/types';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';

export async function cognitoUserToLocalUser(
  cognitoUser: CognitoUser
): Promise<User> {
  cognitoUser.getUserAttributes((attributes: CognitoUserAttribute[]) => {
    return {
      email: attributes.email,
      name: attributes.name,
      token: '',
      'custom:role': cognitoUser.attributes['custom:role'],
      'custom:occupation': cognitoUser.attributes['custom:occupation'],
      'custom:emailNotif': cognitoUser.attributes['custom:emailNotif']
    };
  });
}
