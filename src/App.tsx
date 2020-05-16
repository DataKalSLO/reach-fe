import React from 'react';
import AppBar from './nav/AppBar';
import {
  HOME,
  EXPLORE,
  VIZ_BUILDER,
  STORY_BUILDER,
  MY_STUFF,
  LOGIN,
  SAMPLE,
  CREATE_ACCOUNT,
  SETTINGS,
  ADMIN
} from './nav/constants';
import ProtectedRoute from './nav/ProtectedRoute';
import AdminProtectedRoute from './nav/AdminProtectedRoute';

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
import { history, store, persistor } from './redux/store';
import { Provider } from 'react-redux';

// Containers
import Explore from './containers/Explore';
import VizBuilder from './containers/VizBuilder';
import StoryBuilder from './containers/StoryBuilder';
import MyStuff from './containers/MyStuff';
import Login from './containers/Login';
import Sample from './containers/Sample';
import CreateAccount from './containers/CreateAccount';
import Settings from './containers/Settings';
import Admin from './containers/Admin';
import StoryView from './containers/StoryView';
import { PersistGate } from 'redux-persist/integration/react';

const home = (
  <Route path={HOME} exact>
    <VizBuilder />
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
const createAccount = (
  <Route path={CREATE_ACCOUNT}>
    <CreateAccount />
  </Route>
);
const settings = (
  <Route path={SETTINGS}>
    <ProtectedRoute componentPage={<Settings />} />
  </Route>
);
const admin = (
  <Route path={ADMIN}>
    <AdminProtectedRoute componentPage={<Admin />} />
  </Route>
);
const sample = (
  <Route path={SAMPLE}>
    <Sample />
  </Route>
);
const stories = (
  <Route path="/stories/:storyId">
    <StoryView />
  </Route>
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
              {createAccount}
              {sample}
              {admin}
              {settings}
              {stories}
            </Switch>
          </ThemeProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
