import React from 'react';
import { Button, styled, makeStyles } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';
import GoogleIcon from '../icons/GoogleIcon';
import BoxCenter from '../common/components/BoxCenter';

function ThirdPartyCreateAccount() {
  const styles = useStyles();
  return (
    <BoxCenter className={styles.box}>
      <StyledButton fullWidth variant="outlined" endIcon={<GoogleIcon />}>
        Continue with Google
      </StyledButton>
      <StyledButton fullWidth variant="outlined" endIcon={<AppleIcon />}>
        Continue with Apple
      </StyledButton>
    </BoxCenter>
  );
}

const StyledButton = styled(Button)({
  width: '270px',
  height: '50px'
});

const useStyles = makeStyles({
  box: {
    height: '115px',
    width: '200px'
  }
});

export default ThirdPartyCreateAccount;
