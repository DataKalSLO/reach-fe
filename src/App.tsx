import {
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  ADMIN_UPLOAD_DATA,
  ADMIN_REVIEW_STORIES,
  CREATE_ACCOUNT,
  EXPLORE,
  HOME,
  LOGIN,
  MY_STUFF,
  MY_STUFF_GRAPHS,
  MY_STUFF_STORIES,
  SETTINGS,
  STORY_BUILDER,
  STORY_VIEW_ID,
  VIZ_BUILDER
} from './nav/constants';

// Material UI's theming/styling solution
//  https://material-ui.com/styles/basics/
//  https://material-ui.com/customization/theming/
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';

// Allow query params with router
import { QueryParamProvider } from 'use-query-params';

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

// Containers
import CreateAccount from './containers/CreateAccount';
import Explore from './containers/Explore';
import Login from './containers/Login';
import MyStuff from './containers/my-stuff-landing/MyStuff';
import MyStuffGraphs from './containers/my-stuff-landing/MyStuffGraphs';
import MyStuffStories from './containers/my-stuff-landing/MyStuffStories';
import Settings from './containers/Settings';
import ForgotPassword from './accounts/ForgotPassword';
import ResetPassword from './accounts/ResetPassword';
import { PersistGate } from 'redux-persist/integration/react';
import StoryBuilder from './containers/StoryBuilder';
import StoryViewContainer from './containers/StoryViewContainer';
import VizBuilder from './containers/VizBuilder';
import AdminProtectedRoute from './nav/AdminProtectedRoute';
import AppBar from './nav/AppBar';
import ProtectedRoute from './nav/ProtectedRoute';
import StoryReviewGrid from './admin/StoryReviewGrid';
import DataUploader from './admin/DataUploader';

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
  <Route exact path={MY_STUFF_GRAPHS}>
    <ProtectedRoute componentPage={<MyStuffGraphs />} />
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
const adminUploadData = (
  <Route exact path={ADMIN_UPLOAD_DATA}>
    <AdminProtectedRoute componentPage={<DataUploader />} />
  </Route>
);
const adminReviewStories = (
  <Route exact path={ADMIN_REVIEW_STORIES}>
    <AdminProtectedRoute componentPage={<StoryReviewGrid />} />
  </Route>
);
const forgotPassword = (
  <Route path={FORGOT_PASSWORD}>
    <ForgotPassword />
  </Route>
);
const resetPassword = (
  <Route path={RESET_PASSWORD}>
    <ResetPassword />
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
          <QueryParamProvider ReactRouterRoute={Route}>
            <ThemeProvider theme={theme}>
              <AppBar />
              <Switch>
                {home}
                {explore}
                {vizBuilder}
                {storyBuilder}
                {myStuff}
                {myStuffCharts}
                {myStuffStories}
                {login}
                {createAccount}
                {adminUploadData}
                {adminReviewStories}
                {settings}
                {storyView}
                {forgotPassword}
                {resetPassword}
              </Switch>
            </ThemeProvider>
          </QueryParamProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
