import React, { useState, useCallback } from 'react';
import BoxCenter from '../common/components/BoxCenter';
import { styled, Typography, Button } from '@material-ui/core';
import AccountTextField from '../common/components/AccountTextField';
import { HOME } from '../nav/constants';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { isValidPassword } from './InputValidator';

type ResetPasswordProps = {};

const PasswordResetForm = (props: ResetPasswordProps) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  //TODO: Functions duplicated in CreateAccountForm, move to common util file.
  const validatePassword = useCallback(
    (passwordVal: string) => {
      const isValid = isValidPassword(passwordVal);
      const errorMessage = isValid
        ? ''
        : 'Your password must be at at least 8 characters, contain 1 number, and contain 1 special symbol';
      setPasswordValid(isValid);
      setPasswordErrorMessage(errorMessage);
    },
    [setPasswordValid, setPasswordErrorMessage]
  );

  const handleInputChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(event.target.value);
      validatePassword(event.target.value);
    },
    [validatePassword, setNewPassword]
  );

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
      <AccountTextField
        fullWidth
        placeholder="Verification Code"
        onChange={e => setVerificationCode(e.target.value)}
        variant="filled"
        size="small"
      />
      <AccountTextField
        fullWidth
        placeholder="Password"
        type="password"
        onChange={handleInputChangePassword}
        variant="filled"
        size="small"
      />
      <ErrorMessage>{passwordErrorMessage}</ErrorMessage>
      <ButtonThin
        fullWidth
        variant="contained"
        color="primary"
        onClick={async () => {
          try {
            await Auth.forgotPasswordSubmit(
              email,
              verificationCode,
              newPassword
            );
            history.push(HOME);
          } catch (e) {
            setPasswordErrorMessage(e.message);
          }
        }}
        disabled={!passwordValid}
      >
        RESET PASSWORD
      </ButtonThin>
    </BoxCenterSized>
  );
};

const Title = styled(Typography)({
  textAlign: 'center',
  margin: '35px'
});

const ErrorMessage = styled(Typography)({
  width: '270px',
  fontSize: '13px',
  color: 'red'
});

const ButtonThin = styled(Button)({
  width: '270px'
});

const BoxCenterSized = styled(BoxCenter)({
  height: '300px'
});

export default PasswordResetForm;
