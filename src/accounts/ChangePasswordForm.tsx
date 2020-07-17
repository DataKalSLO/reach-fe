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
import { wrapWithCatch } from '../api/base';
import BoxCenter from '../common/components/BoxCenter';
import { theme } from '../theme/theme';
import { isValidPassword } from './InputValidator';
import { UserSettings } from '../redux/login/types';
import { updateUserSettingsAndPassword } from '../redux/login/actions';

interface ChangePasswordProps {
  isChangingPassword: boolean;
  setIsChangingPassword: (val: boolean) => void;
}

function ChangePasswordForm(props: ChangePasswordProps) {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const isChangingPassword = props.isChangingPassword;
  const setIsChangingPassword = props.setIsChangingPassword;
  const [isLoading, setIsLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const settings: UserSettings = {
    name: user.name,
    'custom:occupation': user['custom:occupation'],
    'custom:emailNotif': user['custom:emailNotif']
  };

  const handleChangePasswordError = useCallback(() => {
    setErrorMessage('Something went wrong. Please try again.');
    setIsLoading(false);
  }, [setErrorMessage, setIsLoading]);

  // Verifies new password conforms to password standards and the passwords match
  const validateNewPassword = useCallback(() => {
    const isValid = isValidPassword(newPassword);

    if (!isValid) {
      return 'Your new password must be at at least 6 characters, contain 1 number, and contain 1 special symbol';
    }

    const passwordsMatch = newPassword === newPasswordConfirmation;

    if (!passwordsMatch) {
      return 'New passwords need to match';
    }

    return '';
  }, [newPassword, newPasswordConfirmation]);

  const handleChangePassword = useCallback(() => {
    const result = validateNewPassword();
    if (result === '') {
      setErrorMessage('');
      setIsLoading(true);
      dispatch(
        wrapWithCatch(
          updateUserSettingsAndPassword(settings, currentPassword, newPassword),
          handleChangePasswordError,
          () => setIsChangingPassword(false)
        )
      );
    } else {
      setErrorMessage(result);
    }
  }, [
    currentPassword,
    dispatch,
    handleChangePasswordError,
    newPassword,
    setIsChangingPassword,
    settings,
    validateNewPassword
  ]);

  const handleClose = () => {
    setIsChangingPassword(false);
    setIsLoading(false);
    setErrorMessage('');
  };

  const handleInputCurrentPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPassword(event.target.value);
    },
    [setCurrentPassword]
  );

  const handleInputNewPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(event.target.value);
    },
    [setNewPassword]
  );

  const handleInputNewPasswordConfirmation = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewPasswordConfirmation(event.target.value);
    },
    [setNewPasswordConfirmation]
  );

  return (
    <Dialog open={isChangingPassword} onClose={handleClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your current and new passwords.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Current Password"
          type="password"
          fullWidth
          onChange={handleInputCurrentPassword}
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
          label="Confirm New Password"
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
