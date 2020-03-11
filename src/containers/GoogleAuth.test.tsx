import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import GoogleAuth from './GoogleAuth';
import { Provider } from 'react-redux';

// Jest docs: https://jestjs.io/docs/en/getting-started

configure({ adapter: new Adapter() });

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush
  })
}));

describe('Google Authentication component', () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;

  it('renders', () => {
    store = mockStore(initialState);
    const googleSignin = shallow(
      <Provider store={store}>
        <GoogleAuth style={'Login with Google'} />
      </Provider>
    );
    expect(googleSignin.exists()).toBe(true);
  });
  it('Click Google Signin', () => {
    store = mockStore(initialState);
    const googleSignin = shallow(
      <Provider store={store}>
        <GoogleAuth style={'Login with Google'} />
      </Provider>
    );
    // click on the google sign in
    googleSignin.find('GoogleAuth').simulate('click');

    // verify the button press has sent user back to home after sign in
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
  it('Click Google Creation', () => {
    store = mockStore(initialState);
    const googleSignin = shallow(
      <Provider store={store}>
        <GoogleAuth style={'Continue with Google'} />
      </Provider>
    );
    // click on the google sign in
    googleSignin.find('GoogleAuth').simulate('click');

    // verify the button press has sent user back to home after sign in
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
