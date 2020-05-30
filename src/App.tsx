// Material UI's theming/styling solution
//  https://material-ui.com/styles/basics/
//  https://material-ui.com/customization/theming/
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';

// Store
//  https://react-redux.js.org/introduction/quick-start
//  https://react-redux.js.org/next/api/hooks
import { history, persistor, store } from './redux/store';

// Link routing and store
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';

// Routing
// https://reacttraining.com/react-router/web/guides/quick-start
import { Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

// Containers
import Admin from './containers/Admin';
import CreateAccount from './containers/CreateAccount';
import Explore from './containers/Explore';
import Login from './containers/Login';
import MyStuff from './containers/my-stuff-landing/MyStuff';
import MyStuffCharts from './containers/my-stuff-landing/MyStuffCharts';
import MyStuffMaps from './containers/my-stuff-landing/MyStuffMaps';
import MyStuffStories from './containers/my-stuff-landing/MyStuffStories';
import Sample from './containers/Sample';
import Settings from './containers/Settings';
import StoryBuilder from './containers/StoryBuilder';
import StoryViewContainer from './containers/StoryViewContainer';
import VizBuilder from './containers/VizBuilder';

//Nav
import {
  ADMIN,
  CREATE_ACCOUNT,
  EXPLORE,
  HOME,
  LOGIN,
  MY_STUFF,
  MY_STUFF_CHARTS,
  MY_STUFF_MAPS,
  MY_STUFF_STORIES,
  SAMPLE,
  SETTINGS,
  STORY_BUILDER,
  STORY_VIEW_ID,
  VIZ_BUILDER
} from './nav/constants';
import AdminProtectedRoute from './nav/AdminProtectedRoute';
import AppBar from './nav/AppBar';
import ProtectedRoute from './nav/ProtectedRoute';

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
  <Route exact path={MY_STUFF}>
    <ProtectedRoute componentPage={<MyStuff />} />
  </Route>
);
const myStuffCharts = (
  <Route exact path={MY_STUFF_CHARTS}>
    <ProtectedRoute componentPage={<MyStuffCharts />} />
  </Route>
);
const myStuffMaps = (
  <Route exact path={MY_STUFF_MAPS}>
    <ProtectedRoute componentPage={<MyStuffMaps />} />
  </Route>
);
const myStuffStories = (
  <Route exact path={MY_STUFF_STORIES}>
    <ProtectedRoute componentPage={<MyStuffStories />} />
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
const storyView = (
  <Route path={STORY_VIEW_ID}>
    <StoryViewContainer />
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
              {myStuffCharts}
              {myStuffMaps}
              {myStuffStories}
              {login}
              {createAccount}
              {sample}
              {admin}
              {settings}
              {storyView}
            </Switch>
          </ThemeProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
