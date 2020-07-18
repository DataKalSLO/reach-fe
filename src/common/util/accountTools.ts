import { User } from '../../redux/login/types';

export function cognitoUserToLocalUser(cognitoUser: any): User {
  return {
    email: cognitoUser.attributes.email,
    name: cognitoUser.attributes.name,
    'custom:role': cognitoUser.attributes['custom:role'],
    'custom:occupation': cognitoUser.attributes['custom:occupation'],
    'custom:emailNotif': cognitoUser.attributes['custom:emailNotif']
  };
}
