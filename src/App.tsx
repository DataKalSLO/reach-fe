// External Imports
import React from 'react';

// Material UI's theming/styling solution
//  https://material-ui.com/styles/basics/
//  https://material-ui.com/customization/theming/
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';

// Routing
//  https://reacttraining.com/react-router/web/guides/quick-start
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Internal Imports
import AppBar from './nav/AppBar';
import {
  HOME,
  EXPLORE,
  VIZ_BUILDER,
  STORY_BUILDER,
  MY_STUFF,
} from './nav/constants';

// Containers
import Home from './containers/Home';
import Explore from './containers/Explore';
import VizBuilder from './containers/VizBuilder';
import StoryBuilder from './containers/StoryBuilder';
import MyStuff from './containers/MyStuff';

/*
  The starting point for the application. 
  App defines the available routes, holds the naviagtion bar, and propagates
  the style to the rest of the app.
*/
function App() {
  const home = (
    <Route path={HOME} exact>
      <Home />
    </Route>
  )
  const explore = (
    <Route path={EXPLORE}>
      <Explore />
    </Route>
  )

  // Currently same as HOME, but could change, so keeping VIZ_BUILDER separate
  const vizBuilder = (
    <Route path={VIZ_BUILDER}>
      <VizBuilder />
    </Route>
  )
  const storyBuilder = (
    <Route path={STORY_BUILDER}>
      <StoryBuilder />
    </Route>
  )
  const myStuff = (
    <Route path={MY_STUFF}>
      <MyStuff />
    </Route>
  )

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
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App;
