import { Button, Grid } from '@material-ui/core';
import MuiAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AccountDropdown from '../containers/AccountDropdown';
import { getUser } from '../redux/login/selectors';
import {
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

const ButtonWithoutHover = styled(Button)({
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent'
  }
});

const StyledMuiAppBar = styled(MuiAppBar)({
  background: '#283c46'
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
        <ButtonWithoutHover onClick={navigateTo(HOME)}>
          <img
            src={require('../common/assets/reach_logo_white.png')}
            alt="Reach wordmark logo"
            width="100%"
          />
        </ButtonWithoutHover>
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
        <Grid item key={EXPLORE_NAME} xs={1}>
          <MenuButton
            name={EXPLORE_NAME}
            navigateToRoute={navigateTo(EXPLORE)}
          />
        </Grid>
        <Grid item key={VIZ_BUILDER_NAME} xs={1}>
          <MenuButton
            name={VIZ_BUILDER_NAME}
            navigateToRoute={navigateTo(VIZ_BUILDER)}
          />
        </Grid>
        <Grid item key={STORY_BUILDER_NAME} xs={1}>
          <MenuButton
            name={STORY_BUILDER_NAME}
            navigateToRoute={navigateTo(STORY_BUILDER)}
          />
        </Grid>
      </Grid>
      <Grid container justify="flex-end" xs={2}>
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
