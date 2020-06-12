import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
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

  it('clicking the Explore button navigates the user to Explore page', () => {
    wrap
      .find('#Explore')
      .find('button')
      .simulate('click');
    expect(history.location.pathname).toEqual('/explore');
  });

  it('clicking the VizBuilder button navigates the user to VizBuilder', () => {
    wrap
      .find('#VizBuilder')
      .find('button')
      .simulate('click');
    expect(history.location.pathname).toEqual('/viz-builder');
  });

  it('clicking the StoryBuilder button navigates the user to StoryBuilder', () => {
    wrap
      .find('#StoryBuilder')
      .find('button')
      .simulate('click');
    expect(history.location.pathname).toEqual('/story-builder');
  });
});
