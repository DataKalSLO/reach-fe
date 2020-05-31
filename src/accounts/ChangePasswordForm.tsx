import React, { useState, useCallback } from 'react';
import {
  Button,
  styled,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/login/selectors';
import { deleteUser } from '../redux/login/actions';
import { wrapWithCatch } from '../api/base';
import { useHistory } from 'react-router-dom';
import { HOME } from '../nav/constants';
import BoxCenter from '../common/components/BoxCenter';
import { theme } from '../theme/theme';
import { isValidPassword } from './InputValidator';

interface ChangePasswordProps {
  isChangePassword: boolean;
  setIsChangePassword: (val: boolean) => void;
  setDisplayError: (val: boolean) => void;
}

function ChangePasswordForm(props: ChangePasswordProps) {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const isChangePassword = props.isChangePassword;
  const setIsChangePassword = props.setIsChangePassword;
  const setDisplayError = props.setDisplayError;
  const [isLoading, setIsLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setnewPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePasswordError = useCallback(() => {
    setIsChangePassword(false);
    setDisplayError(true);
    setIsLoading(false);
  }, [setDisplayError, setIsChangePassword]);

  // Verifies new password conforms to password standards and that passwords match
  const validateNewPassword = useCallback(() => {
    const isValid = isValidPassword(newPassword);

    if (!isValid) {
      return 'Your new password must be at at least 6 characters, contain 1 number, and contain 1 special symbol';
    }

    const passwordsMatch = newPassword == newPasswordConfirmation;

    if (!passwordsMatch) {
      return 'New passwords need to match';
    }

    return '';
  }, [newPassword, newPasswordConfirmation]);

  const handleChangePassword = useCallback(() => {
    const result = validateNewPassword();
    if (result == '') {
      setErrorMessage('');
      setIsLoading(true);
      dispatch(
        wrapWithCatch(
          () => console.log('NEED TO IMPLEMENT'),
          handleChangePasswordError,
          () => console.log('NEED TO IMPLEMENT')
        )
      );
    } else {
      setErrorMessage(result);
    }
  }, [dispatch, handleChangePasswordError, validateNewPassword]);

  const handleClose = () => {
    setIsChangePassword(false);
    setIsLoading(false);
    setErrorMessage('');
  };

  const handleInputOldPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOldPassword(event.target.value);
      // validateEmail(event.target.value);
    },
    [setOldPassword]
  );

  const handleInputNewPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(event.target.value);
      // validateEmail(event.target.value);
    },
    [setNewPassword]
  );

  const handleInputNewPasswordConfirmation = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setnewPasswordConfirmation(event.target.value);
    },
    [setnewPasswordConfirmation]
  );

  return (
    <Dialog open={isChangePassword} onClose={handleClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your old and new passwords.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Old Password"
          type="password"
          fullWidth
          onChange={handleInputOldPassword}
        />
        <TextField
          margin="dense"
          label="New Password"
          type="password"
          fullWidth
          onChange={handleInputNewPassword}
        />
        <TextField
          margin="dense"
          label="Confirm New Address"
          type="password"
          fullWidth
          onChange={handleInputNewPasswordConfirmation}
        />
        <ErrorTypography>{errorMessage}</ErrorTypography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleChangePassword}>Confirm</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
      {isLoading ? (
        <PaddedBoxCenter>
          <CircularProgress />
        </PaddedBoxCenter>
      ) : null}
    </Dialog>
  );
}

const ErrorTypography = styled(Typography)({
  color: theme.palette.error.main
});

const PaddedBoxCenter = styled(BoxCenter)({
  paddingBottom: '20px'
});

export default ChangePasswordForm;
