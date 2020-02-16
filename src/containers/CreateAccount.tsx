import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import CreateAccountForm from './CreateAccountForm';
import OtherCreateAccountForm from './OtherCreateAccountForm';

function CreateAccount() {
  return (
    <Grid 
    container 
    direction="column" 
    alignItems="center"
    justify="center"
  >
    <h1>Create Reach Account</h1>
    <Grid 
      container item
      direction="row" 
      justify="center"
      alignItems="center"
      spacing={10}
    >
      <Grid item>
      <CreateAccountForm />
      </Grid>
      
      <Divider orientation="vertical" flexItem />
      
      <Grid item>
      <OtherCreateAccountForm />
      </Grid>
    </Grid>
  </Grid>
  );
}

export default CreateAccount;
