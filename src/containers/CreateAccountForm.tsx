import React, { useState, useCallback } from 'react';
import { Button, TextField, styled, Typography } from '@material-ui/core';
import BoxCenter from '../common/components/BoxCenter';
import { register } from '../redux/login/actions';
import { RegisterData } from '../redux/login/types';
import { useHistory } from 'react-router-dom';
import { HOME } from '../nav/constants';
import { useDispatch } from 'react-redux';
import { hashSync } from 'bcryptjs';

function CreateAccountForm() {
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

  const validateEmail = useCallback((emailName: string) => {
    const emailValidRegex = new RegExp('(?=.*[@])(?=.*[.])');
    const error = emailValidRegex.test(emailName)
      ? ''
      : 'You must enter a valid email address';
    if (error === '') {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    setEmailErrorMessage(error);
    return error;
  }, []);

  const validatePassword = useCallback((passwordVal: string) => {
    const passwordStrengthRegex = new RegExp(
      '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'
    );
    const error = passwordStrengthRegex.test(passwordVal)
      ? ''
      : 'Your password must be at at least 6 characters, contain 1 number, and contain 1 special symbol';
    if (error === '') {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
    setPasswordErrorMessage(error);
    return error;
  }, []);

  const validatePasswordConfirmation = useCallback(
    (passwordVal, passwordConfirmationVal) => {
      let error = '';
      if (passwordVal !== passwordConfirmationVal) {
        error = 'Passwords need to match';
        setPasswordConfirmationValid(false);
      }
      if (error === '') {
        setPasswordConfirmationValid(true);
      }
      setPasswordConfirmationErrorMessage(error);
      return error;
    },
    []
  );

  const handleInputChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      validateEmail(event.target.value);
    },
    [validateEmail]
  );

  const handleInputChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      validatePassword(event.target.value);
      if (passwordConfirmation !== '') {
        validatePasswordConfirmation(event.target.value, passwordConfirmation);
      }
    },
    [validatePassword, passwordConfirmation, validatePasswordConfirmation]
  );

  const handleInputChangePasswordConfirmation = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirmation(event.target.value);
      validatePasswordConfirmation(password, event.target.value);
    },
    [password, validatePasswordConfirmation]
  );

  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <BoxCenterSized>
      <StyledTextField
        fullWidth
        placeholder="Email Address"
        onChange={handleInputChangeEmail}
      />
      <ErrorMessage>{emailErrorMessage}</ErrorMessage>
      <StyledTextField
        fullWidth
        placeholder="Password"
        type="password"
        onChange={handleInputChangePassword}
      />
      <ErrorMessage>{passwordErrorMessage}</ErrorMessage>
      <StyledTextField
        fullWidth
        placeholder="Confirm Password"
        type="password"
        onChange={handleInputChangePasswordConfirmation}
      />
      <ErrorMessage>{passwordConfirmationErrorMessage}</ErrorMessage>
      <ButtonThin
        disabled={!(emailValid && passwordValid && passwordConfirmationValid)}
        onClick={() => {
          dispatch(
            register({
              email,
              password: hashSync(password, '$2a$10$000000000000000000000000'),
              name: 'dummy',
              role: 'BaseUser'
            } as RegisterData)
          );
          history.push(HOME);
        }}
        fullWidth
        variant="outlined"
      >
        CREATE ACCOUNT
      </ButtonThin>
    </BoxCenterSized>
  );
}

const StyledTextField = styled(TextField)({
  width: '270px'
});

const ButtonThin = styled(Button)({
  width: '270px',
  backgroundColor: 'rgba(0, 154, 138, 0.6)'
});

const ErrorMessage = styled(Typography)({
  width: '270px',
  fontSize: '13px',
  color: 'red'
});

const BoxCenterSized = styled(BoxCenter)({
  height: '200px',
  width: '200px'
});

export default CreateAccountForm;
