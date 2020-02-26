import React from 'react';
import { Typography, Divider, styled } from '@material-ui/core';
import CreateAccountForm from './CreateAccountForm';
import ThirdPartyCreateAccount from './ThirdPartyCreateAccount';
import BoxCenter from '../common/components/BoxCenter';

function CreateAccount() {
  return (
    <BoxCenter>
      <Title variant="h4">Create Reach Account</Title>
      <CreateAccountForm />
      <StyledDivider />
      <ThirdPartyCreateAccount />
    </BoxCenter>
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

export default CreateAccount;
