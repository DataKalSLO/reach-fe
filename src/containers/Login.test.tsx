import React from 'react';
import Login from './Login';

import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';


var mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe('Verify navigation', () => {

  const initialState = {}
  const mockStore = configureStore()
  let store = mockStore(initialState)

  beforeEach(() => {  
    mockPush = jest.fn();
  });

  it('Verify home button navigates to home', () => {
    const { getByText } = render(<Provider store={store}><Login /></Provider>);
    const homeButton = getByText('REACH');

    fireEvent.click(homeButton);
    
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toBeCalledWith('/');
  });

  it('Verify create account button navigates to create account', () => {
    const { getByText } = render(<Provider store={store}><Login /></Provider>);
    const createAccountButton = getByText('CREATE ACCOUNT');

    fireEvent.click(createAccountButton);
    
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toBeCalledWith('/create-account');
  });

  it("Verify link navigates home", () => {
    const { getByText } = render(<Provider store={store}><Login /></Provider>);
    const link = getByText("CAN'T LOG IN?");

    fireEvent.click(link);
    
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toBeCalledWith('/');
  });
});

