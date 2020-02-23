import React from 'react';
import { Grid, Link, Divider, Button, styled } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import SignIn from './SignIn';
import SocialMediaSignIn from './SocialMediaSignIn';
import { HOME } from '../nav/constants';

function Login() {
  const history = useHistory();
  const navigateTo = (route: string) => () => history.push(route);

  return (
    <Grid container direction="column">
      <Grid container direction="row" justify="space-between">
        <Button onClick={navigateTo(HOME)}>REACH</Button>
        <Button onClick={navigateTo(HOME)}>CREATE ACCOUNT</Button>
      </Grid>
      <CenteredGrid container>
        <h1>Log into Reach</h1>
        <Grid container direction="row" justify="center" spacing={9}>
          <SignIn />
          <Divider orientation="vertical" flexItem />
          <SocialMediaSignIn />
        </Grid>
        <Link onClick={navigateTo(HOME)}>CANT LOG IN?</Link>
      </CenteredGrid>
    </Grid>
  );
}

const CenteredGrid = styled(Grid)({
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '75vh'
});

export default Login;
