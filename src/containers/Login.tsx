import React from 'react';
import {
  Box,
  Typography,
  Link,
  Divider,
  Button,
  styled,
  Dialog,
  DialogTitle
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ReachSignIn from '../accounts/ReachSignIn';
import ThirdPartySignIn from '../accounts/ThirdPartySignIn';
import { HOME, CREATE_ACCOUNT, FORGOT_PASSWORD } from '../nav/constants';
import BoxCenter from '../common/components/BoxCenter';

const ReachLogoBlack = () => {
  return (
    <img
      src={require('../common/assets/reach_logo_black.jpg')}
      alt="Reach wordmark logo"
      width="100%"
    />
  );
};

function Login() {
  const history = useHistory();
  const navigateTo = (route: string) => () => history.push(route);

  return (
    <Box>
      <TopBox>
        <ReachButton onClick={navigateTo(HOME)}>
          <ReachLogoBlack />
        </ReachButton>
        <Button onClick={navigateTo(CREATE_ACCOUNT)}>CREATE ACCOUNT</Button>
      </TopBox>

      <Title variant="h4">Log into Reach</Title>

      <SignInOptionsBox>
        <ReachSignIn />
        <Divider orientation="vertical" flexItem />
        <ThirdPartySignIn />
      </SignInOptionsBox>

      <BoxPaddedTop>
        <Link onClick={navigateTo(FORGOT_PASSWORD)}>CAN&apos;T LOG IN?</Link>
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

const ReachButton = styled(Button)({
  width: '120px'
});

export default Login;
