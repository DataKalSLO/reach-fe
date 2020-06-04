import React, { useState, useCallback } from 'react';
import {
  Button,
  styled,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import BoxCenter from '../common/components/BoxCenter';
import AccountTextField from '../common/components/AccountTextField';
import { OccupationDropdown } from '../containers/OccupationDropdown';
import { useHistory } from 'react-router-dom';
import { BASE_USER } from '../nav/constants';
import { useDispatch } from 'react-redux';
import { register } from '../redux/login/actions';
import { RegisterData } from '../redux/login/types';
import { wrapWithCatch } from '../api/base';
import { isValidEmail, isValidPassword } from './InputValidator';

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
  const [emailNotificationEnabled, setEmailNotificationEnabled] = useState(
    true
  );
  const [badEmail, setBadEmail] = useState(false);
  const [occupation, setOccupation] = useState('');

  const validateEmail = useCallback(
    (emailName: string) => {
      const isValid = isValidEmail(emailName);
      const errorMessage = isValid
        ? ''
        : 'You must enter a valid email address';
      setEmailValid(isValid);
      setEmailErrorMessage(errorMessage);
    },
    [setEmailValid, setEmailErrorMessage]
  );

  const validatePassword = useCallback(
    (passwordVal: string) => {
      const isValid = isValidPassword(passwordVal);
      const errorMessage = isValid
        ? ''
        : 'Your password must be at at least 6 characters, contain 1 number, and contain 1 special symbol';
      setPasswordValid(isValid);
      setPasswordErrorMessage(errorMessage);
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
      setEmail(event.target.value.toLowerCase());
      validateEmail(event.target.value.toLowerCase());
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

  const handleAccountError = useCallback(() => {
    setBadEmail(true);
  }, [setBadEmail]);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        wrapWithCatch(
          register({
            email,
            password,
            name: name,
            role: BASE_USER,
            occupation: occupation,
            notificationsEnabled: emailNotificationEnabled,
            isThirdParty: false
          } as RegisterData),
          handleAccountError,
          () => history.go(-2) // returns user back to previous non-login page
        )
      );
    },
    [
      dispatch,
      email,
      password,
      name,
      occupation,
      emailNotificationEnabled,
      handleAccountError,
      history
    ]
  );

  return (
    <form onSubmit={handleSubmit}>
      <BoxCenterSized>
        <AccountTextField
          fullWidth
          placeholder="Name"
          onChange={handleInputChangeName}
          variant="filled"
          size="small"
        />
        <OccupationDropdown
          occupation={occupation}
          setOccupation={setOccupation}
        />
        <AccountTextField
          fullWidth
          error={badEmail}
          helperText={
            badEmail
              ? 'An account has already been created with this email'
              : ''
          }
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
        <EmailSignUp
          emailNotificationEnabled={emailNotificationEnabled}
          setEmailNotificationEnabled={setEmailNotificationEnabled}
        />
        <ButtonThin
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={!emailValid || !passwordValid || !passwordConfirmationValid}
        >
          CREATE ACCOUNT
        </ButtonThin>
      </BoxCenterSized>
    </form>
  );
}

type EmailSignUpProps = {
  emailNotificationEnabled: boolean;
  setEmailNotificationEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmailSignUp = (props: EmailSignUpProps) => {
  const { emailNotificationEnabled, setEmailNotificationEnabled } = props;

  return (
    <FormControlLabelSized
      control={
        <Checkbox
          checked={emailNotificationEnabled}
          onChange={() =>
            setEmailNotificationEnabled(!emailNotificationEnabled)
          }
          color="primary"
        />
      }
      label={
        <EmailSignUpText>
          I would like to receive email notifications from Reach.
        </EmailSignUpText>
      }
    />
  );
};

const EmailSignUpText = styled(Typography)({
  fontSize: '15px'
});

const FormControlLabelSized = styled(FormControlLabel)({
  width: '270px'
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
  height: '360px',
  width: '200px'
});

export default CreateAccountForm;
