import React, { useState, useCallback } from 'react';
import { Grid, TextField, Button, styled } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginData } from '../redux/login/types';
import { loginUser } from '../redux/login/actions';
import { HOME } from '../nav/constants';
import { hashSync } from 'bcryptjs';

function SignIn() {
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
    <Grid container item direction="column" xs={3} spacing={3}>
      <Grid item>
        <TextField
          placeholder="Email Address"
          fullWidth={true}
          onChange={handleInputChangeEmail}
        />
      </Grid>
      <Grid item>
        <TextField
          placeholder="Password"
          type="password"
          fullWidth
          onChange={handleInputChangePassword}
        />
      </Grid>
      <Grid item>
        <StyledButton
          variant="outlined"
          fullWidth
          onClick={() => {
            dispatch(
              loginUser({
                email,
                password: hashSync(password, '$2a$10$000000000000000000000000')
              } as LoginData)
            );
            history.push(HOME);
          }}
        >
          LOG IN
        </StyledButton>
      </Grid>
    </Grid>
  );
}

const StyledButton = styled(Button)({
  backgroundColor: 'rgba(0, 154, 138, 0.6)'
});

export default SignIn;
