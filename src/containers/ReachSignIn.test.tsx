import React from 'react';
import ReachSignIn from './ReachSignIn';

import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Test state changes when user enteres text', () => {
  const initialState = {}
  const mockStore = configureStore();
  let store = mockStore(initialState);

  it('Verify email variable changes when entering text', () => {
    const { getByPlaceholderText } = render(<Provider store={store}><ReachSignIn /></Provider>);
    const emailTextField = getByPlaceholderText('Email Address');

    fireEvent.change(emailTextField, { target: { value: "test@calpoly.edu" } });
    expect(emailTextField.value).toEqual("test@calpoly.edu");
  });

  it('Verify email variable changes when entering text', () => {
    const { getByPlaceholderText } = render(<Provider store={store}><ReachSignIn /></Provider>);
    const passwordTextField = getByPlaceholderText('Email Address');

    fireEvent.change(passwordTextField, { target: { value: "password123!" } });
    expect(passwordTextField.value).toEqual("password123!");
  });
});
