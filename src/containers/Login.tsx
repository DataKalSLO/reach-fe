import React from 'react';
import {
  Grid,
  Link,
  Divider,
  Button,
  Typography,
  styled
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import SignIn from './SignIn';
import ThirdPartySignIn from './ThirdPartySignIn';
import { HOME, CREATE_ACCOUNT } from '../nav/constants';

function Login() {
  const history = useHistory();
  const navigateTo = (route: string) => () => history.push(route);

  return (
    <Grid container direction="column">
      <Grid container direction="row" justify="space-between">
        <Button onClick={navigateTo(HOME)}>REACH</Button>
        <Button onClick={navigateTo(CREATE_ACCOUNT)}>CREATE ACCOUNT</Button>
      </Grid>
      <CenteredGrid container>
        <Title variant="h4">Log into Reach</Title>
        <Grid container direction="row" justify="center" spacing={9}>
          <SignIn />
          <Divider orientation="vertical" flexItem />
          <ThirdPartySignIn />
        </Grid>
        <Link onClick={navigateTo(HOME)}>CAN&apos;T LOG IN?</Link>
      </CenteredGrid>
    </Grid>
  );
}

const CenteredGrid = styled(Grid)({
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '75vh'
});

const Title = styled(Typography)({
  textAlign: 'center',
  margin: '35px'
});

export default Login;
