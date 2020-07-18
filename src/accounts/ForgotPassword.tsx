import React, { useState } from 'react';
import BoxCenter from '../common/components/BoxCenter';
import { styled, Typography, Button } from '@material-ui/core';
import AccountTextField from '../common/components/AccountTextField';
import { RESET_PASSWORD } from '../nav/constants';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

type ResetPasswordProps = {};

const ForgotPassword = (props: ResetPasswordProps) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [sendResetErrorMessage, setSendResetErrorMessage] = useState('');

  async function sendReset() {
    try {
      await Auth.forgotPassword(email);
      history.push(RESET_PASSWORD);
    } catch (e) {
      setSendResetErrorMessage(e.message);
    }
  }

  return (
    <BoxCenterSized>
      <Title variant="h4">Forgot Password</Title>
      <AccountTextField
        fullWidth
        placeholder="Email Address"
        onChange={e => setEmail(e.target.value)}
        variant="filled"
        size="small"
      />
      <ErrorMessage>{sendResetErrorMessage}</ErrorMessage>
      <ButtonThin
        fullWidth
        variant="contained"
        color="primary"
        onClick={sendReset}
      >
        SEND RESET EMAIL
      </ButtonThin>
    </BoxCenterSized>
  );
};

const Title = styled(Typography)({
  textAlign: 'center',
  margin: '35px'
});

const ButtonThin = styled(Button)({
  width: '270px'
});

const ErrorMessage = styled(Typography)({
  width: '270px',
  fontSize: '13px',
  color: 'red'
});

const BoxCenterSized = styled(BoxCenter)({
  height: '300px'
});

export default ForgotPassword;
