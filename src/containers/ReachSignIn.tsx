import React, { useState, useCallback } from 'react';
import { Box, Button, styled } from '@material-ui/core';
import AccountTextField from '../common/components/AccountTextField';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginData } from '../redux/login/types';
import { loginUser } from '../redux/login/actions';
import { HOME } from '../nav/constants';

function ReachSignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleInputChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  const handleInputChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

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
          dispatch(loginUser({ email, password } as LoginData));
          history.push(HOME);
        }}
      >
        LOG IN
      </StyledButton>
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
