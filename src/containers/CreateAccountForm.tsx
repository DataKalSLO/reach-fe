import React, { useState, useCallback } from 'react';
import { Button, TextField, Box, styled, makeStyles } from '@material-ui/core';

function CreateAccountForm() {
  const classes = useStyles();
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

  return (
    <BoxCenter>
      <StyledTextField
        fullWidth
        placeholder="Email Address"
        onChange={handleInputChangeEmail}
        variant="outlined"
      />
      <div className={classes.error}>{emailErrorMessage}</div>
      <StyledTextField
        fullWidth
        placeholder="Password"
        type="password"
        onChange={handleInputChangePassword}
        variant="outlined"
      />
      <div className={classes.error}>{passwordErrorMessage}</div>
      <StyledTextField
        fullWidth
        placeholder="Confirm Password"
        type="password"
        onChange={handleInputChangePasswordConfirmation}
        variant="outlined"
      />
      <div className={classes.error}>{passwordConfirmationErrorMessage}</div>
      {emailValid && passwordValid && passwordConfirmationValid ? (
        <ButtonThin fullWidth variant="outlined">
          CREATE ACCOUNT
        </ButtonThin>
      ) : (
        <ButtonThin disabled fullWidth variant="outlined">
          CREATE ACCOUNT
        </ButtonThin>
      )}
    </BoxCenter>
  );
}

const BoxCenter = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'space-between',
  height: '250px',
  width: '200px'
});

const StyledTextField = styled(TextField)({
  minWidth: '270px'
});

const ButtonThin = styled(Button)({
  minWidth: '270px'
});

const useStyles = makeStyles({
  error: {
    minWidth: '270px',
    fontSize: '13px',
    color: 'red'
  }
});

export default CreateAccountForm;
