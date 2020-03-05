import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import MenuButton from './MenuButton';
import {
  HOME,
  HOME_NAME,
  EXPLORE,
  EXPLORE_NAME,
  VIZ_BUILDER,
  VIZ_BUILDER_NAME,
  STORY_BUILDER,
  STORY_BUILDER_NAME,
  MY_STUFF,
  MY_STUFF_NAME,
  LOGIN,
  CREATE_ACCOUNT
} from './constants';
import AccountDropdown from '../containers/AccountDropdown';

const ButtonWithoutHover = styled(Button)({
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent'
  }
});

const StyledMuiAppBar = styled(MuiAppBar)({
  background: 'linear-gradient(90deg, #586571 -3.4%, #65BDAF 101.98%);'
});

const StyledTypography = styled(Typography)({
  flexGrow: 1,
  display: 'block',
  color: 'white'
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
      <Grid item>
        <ButtonWithoutHover onClick={navigateTo(HOME)}>
          <StyledTypography variant="h6" noWrap>
            {HOME_NAME}
          </StyledTypography>
        </ButtonWithoutHover>
      </Grid>
      <Grid
        item
        container
        xs={10}
        direction="row"
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
      </Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  );

  return displayAppBar(menu);
}

export default AppBar;
