import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import AccountDropdown from '../accounts/AccountDropdown';
import {
  ADMIN_NAME,
  ADMIN_UPLOAD_DATA,
  HOME,
  LOGIN,
  LOGIN_NAME,
  MY_STUFF,
  MY_STUFF_NAME
} from './constants';

export const GridItemButton = (props: { name: string; route: string }) => {
  const history = useHistory();
  const navigateTo = (route: string) => () => history.push(route);

  return (
    <Grid item key={props.name} style={{ paddingTop: 0, paddingBottom: 0 }}>
      <Button
        id={`${props.name.replace(' ', '-')}`}
        onClick={navigateTo(props.route)}
        style={{ color: 'white', textTransform: 'none' }}
      >
        <Typography variant="body1" noWrap>
          {props.name}
        </Typography>
      </Button>
    </Grid>
  );
};

export const LogoButton = () => {
  const history = useHistory();

  const ReachLogoWhite = () => {
    return (
      <img
        src={require('../common/assets/reach_logo_white.png')}
        alt="REACH logo"
        width="100%"
      />
    );
  };

  return (
    <Button size="small" onClick={() => history.push(HOME)}>
      <ReachLogoWhite />
    </Button>
  );
};

export const LoginButton = (props: { isLoggedIn: boolean }) => {
  if (props.isLoggedIn) {
    return <LoggedInUserButtons />;
  } else {
    return <GridItemButton name={LOGIN_NAME} route={LOGIN} />;
  }
};

export const AdminButton = (props: { isAdmin: boolean }) => {
  if (props.isAdmin) {
    return <GridItemButton name={ADMIN_NAME} route={ADMIN_UPLOAD_DATA} />;
  } else {
    return <Fragment />;
  }
};

export const LoggedInUserButtons = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <GridItemButton name={MY_STUFF_NAME} route={MY_STUFF} />
      <IconButton
        onClick={handleClickListItem}
        size="medium"
        aria-haspopup="true"
        aria-controls="settings menu"
      >
        <AccountCircle fontSize="large" />
      </IconButton>
      <AccountDropdown anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};
