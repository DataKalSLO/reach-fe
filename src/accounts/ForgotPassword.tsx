import React, { useState, useCallback } from 'react';
import { Button, styled, Typography } from '@material-ui/core';
import BoxCenter from '../common/components/BoxCenter';
import AccountTextField from '../common/components/AccountTextField';
import { useHistory } from 'react-router-dom';
import { HOME } from '../nav/constants';
import { useQueryParam, StringParam, withDefault } from 'use-query-params';
import { postPassword } from '../api/login';
import { PasswordResetData } from '../redux/login/types';

function ForgotPassword() {
  const history = useHistory();

  const [token] = useQueryParam('token', withDefault(StringParam, ''));
  const [email] = useQueryParam('email', withDefault(StringParam, ''));
  console.log(token);
  if (!email || !token) history.push(HOME); // Redirect to home on invalid URL

  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [
    passwordConfirmationErrorMessage,
    setPasswordConfirmationErrorMessage
  ] = useState('');
  const [passwordConfirmationValid, setPasswordConfirmationValid] = useState(
    false
  );

  const validatePassword = useCallback(
    (passwordVal: string) => {
      const passwordStrengthRegex = new RegExp(
        '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'
      );
      const error = passwordStrengthRegex.test(passwordVal)
        ? ''
        : 'Your password must be at at least 6 characters, contain 1 number, and contain 1 special symbol';
      setPasswordValid(error === '');
      setPasswordErrorMessage(error);
      return error;
    },
    [setPasswordValid, setPasswordErrorMessage]
  );

  const validatePasswordConfirmation = useCallback(
    (passwordVal, passwordConfirmationVal) => {
      let error = '';
      if (passwordVal !== passwordConfirmationVal) {
        error = 'Passwords need to match';
      }
      setPasswordConfirmationValid(error === '');
      setPasswordConfirmationErrorMessage(error);
      return error;
    },
    [setPasswordConfirmationValid, setPasswordConfirmationErrorMessage]
  );

  const handleInputChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      validatePassword(event.target.value);
      if (passwordConfirmation !== '') {
        validatePasswordConfirmation(event.target.value, passwordConfirmation);
      }
    },
    [
      validatePassword,
      passwordConfirmation,
      validatePasswordConfirmation,
      setPassword
    ]
  );

  const handleInputChangePasswordConfirmation = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirmation(event.target.value);
      validatePasswordConfirmation(password, event.target.value);
    },
    [password, validatePasswordConfirmation, setPasswordConfirmation]
  );

  return (
    <BoxCenterSized>
      <AccountTextField
        fullWidth
        disabled={true}
        placeholder={email}
        variant="filled"
        size="small"
      />
      <AccountTextField
        fullWidth
        placeholder="New password"
        type="password"
        onChange={handleInputChangePassword}
        variant="filled"
        size="small"
      />
      <ErrorMessage>{passwordErrorMessage}</ErrorMessage>
      <AccountTextField
        fullWidth
        placeholder="Confirm password"
        type="password"
        onChange={handleInputChangePasswordConfirmation}
        variant="filled"
        size="small"
      />
      <ErrorMessage>{passwordConfirmationErrorMessage}</ErrorMessage>
      <ButtonThin
        fullWidth
        variant="contained"
        color="primary"
        disabled={!passwordValid || !passwordConfirmationValid}
        onClick={async () => {
          try {
            await postPassword({ email } as PasswordResetData);
            history.push(HOME);
          } catch {
            // Error
          }
        }}
      >
        Change my password
      </ButtonThin>
    </BoxCenterSized>
  );
}

const ButtonThin = styled(Button)({
  width: '270px'
});

const ErrorMessage = styled(Typography)({
  width: '270px',
  fontSize: '13px',
  color: 'red'
});

const BoxCenterSized = styled(BoxCenter)({
  height: '660px',
  width: '200px'
});

export default ForgotPassword;
