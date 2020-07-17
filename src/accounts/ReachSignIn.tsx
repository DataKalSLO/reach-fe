import { Box, Button, CircularProgress, Fade, styled } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { wrapWithCatch } from '../api/base';
import AccountTextField from '../common/components/AccountTextField';
import { loginUser } from '../redux/login/actions';
import { LoginData } from '../redux/login/types';
import { STORY_BUILDER } from '../nav/constants';

function ReachSignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badLogin, setBadLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleInputChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value.toLowerCase());
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

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setLoading(true);
      dispatch(
        wrapWithCatch(
          loginUser({ email, password } as LoginData),
          handleLoginError,
          //TODO: Change this to HOME
          () => history.push(STORY_BUILDER)
        )
      );
    },
    [dispatch, email, password, handleLoginError, history]
  );

  return (
    <form onSubmit={handleSubmit}>
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
          //TODO: Take error message from login error.
          helperText={badLogin ? 'Incorrect email/password combination' : ' '}
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
          type="submit"
        >
          LOG IN
        </StyledButton>
        <Fade in={loading}>
          <CircularProgress />
        </Fade>
      </SignInBox>
    </form>
  );
}

const paddingDefault = '40px';

const SignInBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: paddingDefault,
  paddingRight: paddingDefault,
  height: '235px',
  width: '270px'
});

const StyledButton = styled(Button)({
  margin: '15px'
});

export default ReachSignIn;
