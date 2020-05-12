import React, { useState, useCallback } from 'react';
import {
  Button,
  styled,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/login/selectors';
import { deleteUser } from '../redux/login/actions';
import { wrapWithCatch } from '../api/base';
import { useHistory } from 'react-router-dom';
import { HOME } from '../nav/constants';
import BoxCenter from '../common/components/BoxCenter';
import { theme } from '../theme/theme';

interface ConfirmDeleteProps {
  isConfirmDelete: boolean;
  setIsConfirmDelete: (val: boolean) => void;
  setDisplayError: (val: boolean) => void;
}

function ConfirmDeleteAccount(props: ConfirmDeleteProps) {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const isConfirmDelete = props.isConfirmDelete;
  const setIsConfirmDelete = props.setIsConfirmDelete;
  const setDisplayError = props.setDisplayError;
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccountError = useCallback(() => {
    setIsConfirmDelete(false);
    setDisplayError(true);
    setIsLoading(false);
  }, [setDisplayError, setIsConfirmDelete]);

  const handleDelete = useCallback(() => {
    setIsLoading(true);
    dispatch(
      wrapWithCatch(
        deleteUser(user.email, user.token),
        handleDeleteAccountError,
        () => history.push(HOME)
      )
    );
  }, [dispatch, handleDeleteAccountError, history, user.email, user.token]);

  const handleClose = () => {
    setIsConfirmDelete(false);
    setIsLoading(false);
  };

  return (
    <Dialog open={isConfirmDelete} onClose={handleClose}>
      <DialogTitle>
        Are you sure you want to delete your REACH account?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action will delete your account.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DeleteButton onClick={handleDelete}>Confirm</DeleteButton>
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

const DeleteButton = styled(Button)({
  color: theme.palette.error.main
});

const PaddedBoxCenter = styled(BoxCenter)({
  paddingBottom: '20px'
});

export default ConfirmDeleteAccount;
