import React from 'react';
import {
  Box,
  Typography,
  Link,
  Divider,
  Button,
  styled
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ReachSignIn from './ReachSignIn';
import ThirdPartySignIn from './ThirdPartySignIn';
import { HOME, CREATE_ACCOUNT } from '../nav/constants';
import BoxCenter from '../common/components/BoxCenter';

function Login() {
  const history = useHistory();
  const navigateTo = (route: string) => () => history.push(route);

  return (
    <Box>
      <TopBox>
        <Button onClick={navigateTo(HOME)}>REACH</Button>
        <Button onClick={navigateTo(CREATE_ACCOUNT)}>CREATE ACCOUNT</Button>
      </TopBox>

      <Title variant="h4">Log into Reach</Title>

      <SignInOptionsBox>
        <ReachSignIn />
        <Divider orientation="vertical" flexItem />
        <ThirdPartySignIn />
      </SignInOptionsBox>

      <BoxPaddedTop>
        <Link onClick={navigateTo(HOME)}>CAN&apos;T LOG IN?</Link>
      </BoxPaddedTop>
    </Box>
  );
}

const TopBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: '20px'
});

const SignInOptionsBox = styled(BoxCenter)({
  flexDirection: 'row',
  justifyContent: 'center'
});

const Title = styled(Typography)({
  textAlign: 'center',
  margin: '35px'
});

const BoxPaddedTop = styled(BoxCenter)({
  paddingTop: '40px'
});

export default Login;
