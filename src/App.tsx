import React from 'react';
import AppBar from './nav/AppBar';
import {
  HOME,
  EXPLORE,
  VIZ_BUILDER,
  STORY_BUILDER,
  MY_STUFF,
  LOGIN
} from './nav/constants';

// Material UI's theming/styling solution
//  https://material-ui.com/styles/basics/
//  https://material-ui.com/customization/theming/
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';

// Routing
//  https://reacttraining.com/react-router/web/guides/quick-start
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Containers
import Home from './containers/Home';
import Explore from './containers/Explore';
import VizBuilder from './containers/VizBuilder';
import StoryBuilder from './containers/StoryBuilder';
import MyStuff from './containers/MyStuff';
import Login from './containers/Login';

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

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Switch>
          {home}
          {explore}
          {vizBuilder}
          {storyBuilder}
          {myStuff}
          {login}
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
