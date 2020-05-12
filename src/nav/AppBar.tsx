import { Button, Grid } from '@material-ui/core';
import MuiAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AccountDropdown from '../accounts/AccountDropdown';
import { getUser } from '../redux/login/selectors';
import { NAV_BAR_COLOR } from '../theme/theme';
import {
  ADMIN,
  ADMIN_NAME,
  ADMIN_USER,
  CREATE_ACCOUNT,
  EXPLORE,
  EXPLORE_NAME,
  HOME,
  LOGIN,
  LOGIN_NAME,
  MY_STUFF,
  MY_STUFF_NAME,
  STORY_BUILDER,
  STORY_BUILDER_NAME,
  VIZ_BUILDER,
  VIZ_BUILDER_NAME
} from './constants';
import MenuButton from './MenuButton';

const ReachLogoWhite = () => {
  return (
    <img
      src={require('../common/assets/reach_logo_white.png')}
      alt="Reach wordmark logo"
      width="100%"
    />
  );
};

const StyledMuiAppBar = styled(MuiAppBar)({
  background: NAV_BAR_COLOR,
  // necessary to put appbar in front of story builder toolbar
  position: 'sticky'
});

const displayAppBar = (menu: JSX.Element) => {
  const currentRoute = window.location.pathname;

  // Hide the AppBar if on the Login or Create Account Page
  if (currentRoute === LOGIN || currentRoute === CREATE_ACCOUNT) {
    return <div />;
  } else {
    return (
      <StyledMuiAppBar position="static">
        <Toolbar>{menu}</Toolbar>
      </StyledMuiAppBar>
    );
  }
};

function AppBar() {
  const history = useHistory();
  const navigateTo = (route: string) => () => history.push(route);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user = useSelector(getUser);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menu = (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={3}
    >
      <Grid item xs={1}>
        <Button onClick={navigateTo(HOME)}>
          <ReachLogoWhite />
        </Button>
      </Grid>
      <Grid
        item
        container
        direction="row"
        xs={9}
        justify="center"
        alignItems="center"
        spacing={8}
        wrap="nowrap"
      >
        <Grid item key={EXPLORE_NAME}>
          <MenuButton
            name={EXPLORE_NAME}
            navigateToRoute={navigateTo(EXPLORE)}
          />
        </Grid>
        <Grid item key={VIZ_BUILDER_NAME}>
          <MenuButton
            name={VIZ_BUILDER_NAME}
            navigateToRoute={navigateTo(VIZ_BUILDER)}
          />
        </Grid>
        <Grid item key={STORY_BUILDER_NAME}>
          <MenuButton
            name={STORY_BUILDER_NAME}
            navigateToRoute={navigateTo(STORY_BUILDER)}
          />
        </Grid>
        {user.role === ADMIN_USER ? (
          <Grid item key={ADMIN_NAME}>
            <MenuButton name={ADMIN_NAME} navigateToRoute={navigateTo(ADMIN)} />
          </Grid>
        ) : null}
      </Grid>
      <Grid item container justify="flex-end" xs={2}>
        <Grid item>
          {user.email ? (
            <React.Fragment>
              <MenuButton
                name={MY_STUFF_NAME}
                navigateToRoute={navigateTo(MY_STUFF)}
              />
              <IconButton
                onClick={handleClickListItem}
                aria-haspopup="true"
                aria-controls="menu"
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <AccountDropdown anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            </React.Fragment>
          ) : (
            <MenuButton name={LOGIN_NAME} navigateToRoute={navigateTo(LOGIN)} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );

  return displayAppBar(menu);
}

export default AppBar;
