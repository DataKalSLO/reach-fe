import React from 'react';
import { Typography, Divider, Box, styled } from '@material-ui/core';
import CreateAccountForm from './CreateAccountForm';
import ThirdPartyCreateAccount from './ThirdPartyCreateAccount';

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

const BoxCenter = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center'
});

const Title = styled(Typography)({
  textAlign: 'center',
  margin: '35px'
});

export default CreateAccount;
