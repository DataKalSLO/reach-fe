import { Grid, Toolbar } from '@material-ui/core';
import MuiAppBar from '@material-ui/core/AppBar';
import { styled } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/login/selectors';
import { NAV_BAR_COLOR } from '../theme/theme';
import {
  AdminButton,
  GridItemButton,
  LoginButton,
  LogoButton
} from './AppBarButtons';
import {
  ADMIN_USER,
  CREATE_ACCOUNT,
  EXPLORE,
  EXPLORE_NAME,
  LOGIN,
  STORY_BUILDER,
  STORY_BUILDER_NAME,
  VIZ_BUILDER,
  VIZ_BUILDER_NAME
} from './constants';

export default function AppBar() {
  const user = useSelector(getUser);

  const Menu = (
    <Grid container justify="space-between" alignItems="center">
      <Grid
        item
        container
        xs={7}
        spacing={2}
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={2}>
          <LogoButton />
        </Grid>
        <Grid item container xs={10} spacing={2}>
          <GridItemButton name={EXPLORE_NAME} route={EXPLORE} />
          <GridItemButton name={VIZ_BUILDER_NAME} route={VIZ_BUILDER} />
          <GridItemButton name={STORY_BUILDER_NAME} route={STORY_BUILDER} />
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={5}
        spacing={2}
        alignItems="center"
        justify="flex-end"
      >
        <AdminButton isAdmin={user.role === ADMIN_USER} />
        <LoginButton isLoggedIn={user.email !== ''} />
      </Grid>
    </Grid>
  );

  const displayAppBar = (menu: JSX.Element) => {
    const currentRoute = window.location.pathname;

    // Hide the AppBar if on the Login or Create Account Page
    // TODO: this doesn't work on firefox
    if (currentRoute === LOGIN || currentRoute === CREATE_ACCOUNT) {
      return <Fragment />;
    } else {
      return (
        <StyledMuiAppBar position="static">
          <Toolbar>{menu}</Toolbar>
        </StyledMuiAppBar>
      );
    }
  };

  return displayAppBar(Menu);
}

const StyledMuiAppBar = styled(MuiAppBar)({
  background: NAV_BAR_COLOR,
  position: 'sticky' // necessary to put appbar in front of sidebars
});
