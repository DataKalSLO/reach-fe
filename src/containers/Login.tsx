import React from 'react';
import { Grid, Divider, Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import SignIn from './SignIn';
import OtherSignIn from './OtherSignIn';
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
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        style={{ minHeight: '75vh' }}
      >
        <h1>Log into Reach</h1>
        <Grid container direction="row" justify="center" spacing={9}>
          <SignIn />
          <Divider orientation="vertical" flexItem />
          <OtherSignIn />
        </Grid>
        <Link onClick={navigateTo(HOME)}>CANT LOG IN?</Link>
      </Grid>
    </Grid>
  );
}

export default Login;
