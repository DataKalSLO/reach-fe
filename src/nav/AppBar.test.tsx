import React from 'react';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import AppBar from './AppBar';

configure({ adapter: new Adapter() });

describe('AppBar Navigation Tests', () => {
  let wrap: any;
  let history: any;

  beforeAll(() => {
    const mockStore = configureStore();
    const initialState = { user: { name: 'mock' } };
    const store = mockStore(initialState);
    history = createMemoryHistory();

    wrap = mount(
      <Provider store={store}>
        <Router history={history}>
          <AppBar />
        </Router>
      </Provider>
    );
  });

  it('clicking the expore button navigates the user to explore', () => {
    wrap
      .find('#menu-button-Explore')
      .find('button')
      .simulate('click');
    expect(history.location.pathname).toEqual('/explore');
  });

  it('clicking the viz builder button navigates the user to viz builder', () => {
    wrap
      .find('#menu-button-VizBuilder')
      .find('button')
      .simulate('click');
    expect(history.location.pathname).toEqual('/viz-builder');
  });

  it('clicking the story builder button navigates the user to story builder', () => {
    wrap
      .find('#menu-button-StoryBuilder')
      .find('button')
      .simulate('click');
    expect(history.location.pathname).toEqual('/story-builder');
  });

  it('clicking the login button navigates the user to login', () => {
    wrap
      .find('#menu-button-Login')
      .find('button')
      .simulate('click');
    expect(history.location.pathname).toEqual('/login');
  });
});
