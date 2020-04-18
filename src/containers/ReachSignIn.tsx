import React, { useState, useCallback } from 'react';
import { Box, Button, styled, CircularProgress } from '@material-ui/core';
import AccountTextField from '../common/components/AccountTextField';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginData } from '../redux/login/types';
import { loginUser, deleteUser } from '../redux/login/actions';
import { getUser } from '../redux/login/selectors';
import { wrapWithCatch } from '../api/base';
import { HOME } from '../nav/constants';

function ReachSignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badLogin, setBadLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const user = useSelector(getUser);

  const handleInputChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const handleInputChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const handleLoginError = useCallback(() => {
    setBadLogin(true);
    setLoading(false);
  }, [setBadLogin, setLoading]);

  return (
    <SignInBox>
      <AccountTextField
        placeholder="Email Address"
        fullWidth
        variant="filled"
        size="small"
        onChange={handleInputChangeEmail}
      />
      <AccountTextField
        error={badLogin}
        helperText={badLogin ? 'Incorrect email/password combination' : ''}
        placeholder="Password"
        type="password"
        fullWidth
        variant="filled"
        size="small"
        onChange={handleInputChangePassword}
      />
      <StyledButton
        variant="contained"
        fullWidth
        color="primary"
        onClick={() => {
          setLoading(true);
          dispatch(
            wrapWithCatch(
              loginUser({ email, password } as LoginData),
              handleLoginError,
              () => history.push(HOME)
            )
          );
        }}
      >
        LOG IN
      </StyledButton>
      <StyledButton
        variant="contained"
        fullWidth
        color="primary"
        onClick={() => {
          dispatch(
            deleteUser(user.email, user.token) // delete currently logged in user using current token as validation
          );
        }}
      >
        Delete
      </StyledButton>
      {loading ? <CircularProgress /> : null}
    </SignInBox>
  );
}

const paddingDefault = '40px';

const SignInBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'space-around',
  paddingLeft: paddingDefault,
  paddingRight: paddingDefault,
  height: '215px',
  width: '270px'
});

const StyledButton = styled(Button)({
  margin: '15px'
});

export default ReachSignIn;
