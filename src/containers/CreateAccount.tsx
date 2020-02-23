import React from 'react';
import { Grid, Divider, styled } from '@material-ui/core';
import CreateAccountForm from './CreateAccountForm';
import ThirdPartyCreateAccount from './ThirdPartyCreateAccount';

function CreateAccount() {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <h1>Create Reach Account</h1>
      <GridCenter
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        spacing={8}
      >
        <Grid item>
          <CreateAccountForm />
        </Grid>
        <StyledDivider />
        <Grid item>
          <ThirdPartyCreateAccount />
        </Grid>
      </GridCenter>
    </Grid>
  );
}

const StyledDivider = styled(Divider)({
  minWidth: '270px'
});

const GridCenter = styled(Grid)({
  minHeight: '75vh'
});

export default CreateAccount;
