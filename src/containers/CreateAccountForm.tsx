import React, { useState, useCallback } from 'react';
import { Button, styled, Typography } from '@material-ui/core';
import BoxCenter from '../common/components/BoxCenter';
import AccountTextField from '../common/components/AccountTextField';

function CreateAccountForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [emailValid, setEmailValid] = useState(false);
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

  const validateEmail = useCallback(
    (emailName: string) => {
      const emailValidRegex = new RegExp('(?=.*[@])(?=.*[.])');
      const error = emailValidRegex.test(emailName)
        ? ''
        : 'You must enter a valid email address';
      setEmailValid(error === '');
      setEmailErrorMessage(error);
      return error;
    },
    [setEmailValid, setEmailErrorMessage]
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

  const handleInputChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      validateEmail(event.target.value);
    },
    [validateEmail, setEmail]
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

  const handleInputChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName]
  );

  return (
    <BoxCenterSized>
      <AccountTextField
        fullWidth
        placeholder="Name"
        onChange={handleInputChangeName}
        variant="filled"
        size="small"
      />
      <AccountTextField
        fullWidth
        placeholder="Email Address"
        onChange={handleInputChangeEmail}
        variant="filled"
        size="small"
      />
      <ErrorMessage>{emailErrorMessage}</ErrorMessage>
      <AccountTextField
        fullWidth
        placeholder="Password"
        type="password"
        onChange={handleInputChangePassword}
        variant="filled"
        size="small"
      />
      <ErrorMessage>{passwordErrorMessage}</ErrorMessage>
      <AccountTextField
        fullWidth
        placeholder="Confirm Password"
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
        disabled={!emailValid || !passwordValid || !passwordConfirmationValid}
      >
        CREATE ACCOUNT
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
  height: '425px',
  width: '200px'
});

export default CreateAccountForm;
