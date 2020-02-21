import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import CreateAccountForm from './CreateAccountForm';
import AlternateCreateAccount from './AlternateCreateAccount';
import './CreateAccount.css';

function CreateAccount() {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <h1>Create Reach Account</h1>
      <Grid
        container
        item
        className="center"
        direction="column"
        justify="center"
        alignItems="center"
        spacing={8}
      >
        <Grid item>
          <CreateAccountForm />
        </Grid>
        <Divider className="divider" />
        <Grid item>
          <AlternateCreateAccount />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CreateAccount;
