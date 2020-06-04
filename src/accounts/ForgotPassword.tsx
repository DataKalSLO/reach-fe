import React, { useState } from 'react';
import BoxCenter from '../common/components/BoxCenter';
import { styled, Typography, Button } from '@material-ui/core';
import AccountTextField from '../common/components/AccountTextField';
import { postPassword } from '../api/login';
import { PasswordResetData } from '../redux/login/types';
import { HOME } from '../nav/constants';
import { useHistory } from 'react-router-dom';

type ResetPasswordProps = {};

const ForgotPassword = (props: ResetPasswordProps) => {
  const history = useHistory();
  const [email, setEmail] = useState('');

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
      <ButtonThin
        fullWidth
        variant="contained"
        color="primary"
        onClick={async () => {
          try {
            await postPassword({ email } as PasswordResetData);
            history.push(HOME);
          } catch {
            // Error
          }
        }}
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

const BoxCenterSized = styled(BoxCenter)({
  height: '300px'
});

export default ForgotPassword;
