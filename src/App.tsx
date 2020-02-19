import React from 'react';
import AppBar from './nav/AppBar';
import {
  HOME,
  EXPLORE,
  VIZ_BUILDER,
  STORY_BUILDER,
  MY_STUFF,
  LOGIN,
  SAMPLE
} from './nav/constants';

// Material UI's theming/styling solution
//  https://material-ui.com/styles/basics/
//  https://material-ui.com/customization/theming/
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';

// Routing
//  https://reacttraining.com/react-router/web/guides/quick-start
import { Switch, Route } from 'react-router-dom';

// Link routing and store
import { ConnectedRouter } from 'connected-react-router';

// Store
//  https://react-redux.js.org/introduction/quick-start
//  https://react-redux.js.org/next/api/hooks
import store, { history } from './redux/store';
import { Provider } from 'react-redux';

// Containers
import Home from './containers/Home';
import Explore from './containers/Explore';
import VizBuilder from './containers/VizBuilder';
import StoryBuilder from './containers/StoryBuilder';
import MyStuff from './containers/MyStuff';
import Login from './containers/Login';
import Sample from './containers/Sample';

function App() {
  const home = (
    <Route path={HOME} exact>
      <Home />
    </Route>
  );
  const explore = (
    <Route path={EXPLORE}>
      <Explore />
    </Route>
  );
  const vizBuilder = (
    <Route path={VIZ_BUILDER}>
      <VizBuilder />
    </Route>
  );
  const storyBuilder = (
    <Route path={STORY_BUILDER}>
      <StoryBuilder />
    </Route>
  );
  const myStuff = (
    <Route path={MY_STUFF}>
      <MyStuff />
    </Route>
  );
  const login = (
    <Route path={LOGIN}>
      <Login />
    </Route>
  );
  const sample = (
    <Route path={SAMPLE}>
      <Sample />
    </Route>
  );

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <AppBar />
          <Switch>
            {home}
            {explore}
            {vizBuilder}
            {storyBuilder}
            {myStuff}
            {login}
            {sample}
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
