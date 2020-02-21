import React, { useState, useCallback } from 'react';
import { Grid, Button, TextField, Box } from '@material-ui/core';
import './CreateAccountForm.css';

function CreateAccountForm() {
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [
    passwordConfirmationMessage,
    setPasswordConfirmationMessage
  ] = useState('');
  const [passwordConfirmationValid, setPasswordConfirmationValid] = useState(
    false
  );

  const validateEmail = useCallback((emailName: string) => {
    const emailValidRegex = new RegExp('(?=.*[@])(?=.*[.])');
    const error = emailValidRegex.test(emailName)
      ? ''
      : 'You must enter a valid email address';
    if (error == '') {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    setEmailMessage(error);
    return error;
  }, []);

  const validatePassword = useCallback((passwordVal: string) => {
    const passwordStrengthRegex = new RegExp(
      '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'
    );
    const error = passwordStrengthRegex.test(passwordVal)
      ? ''
      : 'Your password must be at at least 6 characters, contain 1 number, and contain 1 special symbol';
    if (error == '') {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
    setPasswordMessage(error);
    return error;
  }, []);

  const validatePasswordConfirmation = useCallback(
    (passwordVal, passwordConfirmationVal) => {
      let error = '';
      if (passwordVal != passwordConfirmationVal) {
        error = 'Passwords need to match';
      }
      if (error == '') {
        setPasswordConfirmationValid(true);
      } else {
        setPasswordConfirmationValid(false);
      }
      setPasswordConfirmationMessage(error);
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
    },
    [validatePassword]
  );

  const handleInputChangePasswordConfirmation = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirmation(event.target.value);
      validatePasswordConfirmation(password, event.target.value);
    },
    [password, validatePasswordConfirmation]
  );

  return (
    <Box>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <div className="field">
            <TextField
              fullWidth
              placeholder="Email Address"
              onChange={handleInputChangeEmail}
            />
          </div>
          <div className="error">{emailMessage}</div>
        </Grid>
        <Grid item>
          <div className="field">
            <TextField
              fullWidth
              placeholder="Password"
              type="password"
              onChange={handleInputChangePassword}
            />
          </div>
          <div className="error">{passwordMessage}</div>
        </Grid>
        <Grid item>
          <div className="field">
            <TextField
              fullWidth
              placeholder="Confirm Password"
              type="password"
              onChange={handleInputChangePasswordConfirmation}
            />
          </div>
          <div className="error">{passwordConfirmationMessage}</div>
        </Grid>
        <Grid item>
          <div className="field">
            {emailValid && passwordValid && passwordConfirmationValid ? (
              <Button fullWidth variant="outlined">
                CREATE ACCOUNT
              </Button>
            ) : (
              <Button disabled fullWidth variant="outlined">
                CREATE ACCOUNT
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateAccountForm;
