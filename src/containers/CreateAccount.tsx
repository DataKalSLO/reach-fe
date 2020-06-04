import React from 'react';
import { Typography, Divider, Link, styled } from '@material-ui/core';
import CreateAccountForm from '../accounts/CreateAccountForm';
import ThirdPartyCreateAccount from '../accounts/ThirdPartyCreateAccount';
import BoxCenter from '../common/components/BoxCenter';
import { useHistory } from 'react-router-dom';
import { LOGIN, HOME } from '../nav/constants';

function CreateAccount() {
  const history = useHistory();
  const navigateTo = (route: string) => () =>
    history.push(route, { redirectTo: HOME });

  return (
    <BoxCenterSized>
      <Title variant="h4">Create Reach Account</Title>
      <CreateAccountForm />
      <StyledDivider />
      <ThirdPartyCreateAccount />
      <Link onClick={navigateTo(LOGIN)}>ALREADY HAVE AN ACCOUNT?</Link>
    </BoxCenterSized>
  );
}

const StyledDivider = styled(Divider)({
  width: '270px',
  height: '2px',
  margin: '20px'
});

const Title = styled(Typography)({
  textAlign: 'center',
  margin: '35px'
});

const BoxCenterSized = styled(BoxCenter)({
  height: '580px'
});

export default CreateAccount;
