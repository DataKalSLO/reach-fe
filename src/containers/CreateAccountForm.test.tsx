import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import { HOME } from '../nav/constants';
import CreateAccount from './CreateAccount';
import CreateAccountForm from './CreateAccountForm';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { Link, Checkbox } from '@material-ui/core';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store';

// Jest docs: https://jestjs.io/docs/en/getting-started

configure({adapter: new Adapter()});

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: mockPush,
    }),
  }));

describe('Create Account', () => {
  const initialState = {}
  const mockStore = configureStore()  
  let store
  it('Navigate to log in page', () => {
    const createAccount = shallow(<CreateAccount/>);

    createAccount.find(Link).simulate('click');
    createAccount.find(Link).simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(2);
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('Checkbox click', () => {
    store = mockStore(initialState)
    const createAccountForm = shallow(<Provider store={store}><CreateAccountForm/></Provider>);

    let checkbox = createAccountForm.find(Checkbox);
    expect(checkbox.exists(true));
  });
});