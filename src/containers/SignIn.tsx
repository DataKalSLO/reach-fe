import React, { useState, useCallback } from 'react';
import { Grid, TextField, Button, styled } from '@material-ui/core';
import { login } from '../api/login';
import { User } from '../redux/login/types';

function SignIn() {
  const [email, setEmail] = useState('');

  const handleInputChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
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
        <TextField placeholder="Password" type="password" fullWidth />
      </Grid>
      <Grid item>
        <StyledButton
          variant="outlined"
          fullWidth
          onClick={() => {
            login({ email } as User);
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
