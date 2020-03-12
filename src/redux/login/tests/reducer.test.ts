import { LOGIN, LOGOUT, UserActionTypes, User } from '../types';
import { userReducer } from '../reducer';

describe('user reducer', () => {
  const noCurrentUser: User = {
    email: '',
    token: ''
  };

  const dummyUser: User = {
    email: 'fake.email@hourglassproject.org',
    token: 'gibberish'
  };

  const differentDummyUser: User = {
    email: 'different.fake.email@hourglassproject.org',
    token: 'different_gibberish'
  };

  it('does nothing when logging out before logging in', () => {
    expect(userReducer(undefined, { type: LOGOUT })).toEqual(noCurrentUser);
  });

  it('logs in successfully', () => {
    expect(userReducer(undefined, { type: LOGIN, payload: dummyUser })).toEqual(
      dummyUser
    );
  });

  it('takes the new user if attempting to log in when already logged in', () => {
    expect(
      userReducer(dummyUser, { type: LOGIN, payload: differentDummyUser })
    ).toEqual(differentDummyUser);
  });

  it('logs out successfully', () => {
    expect(userReducer(differentDummyUser, { type: LOGOUT })).toEqual(
      noCurrentUser
    );
  });

  it('does nothing when logging out after logging out', () => {
    expect(userReducer(noCurrentUser, { type: LOGOUT })).toEqual(noCurrentUser);
  });

  it('logs back in after logging out successfully', () => {
    expect(
      userReducer(noCurrentUser, { type: LOGIN, payload: dummyUser })
    ).toEqual(dummyUser);
  });
});
