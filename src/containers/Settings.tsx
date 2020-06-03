import React, { useState, useCallback } from 'react';
import {
  Paper,
  Typography,
  IconButton,
  Divider,
  Box,
  Button,
  TextField,
  Switch,
  styled
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/login/selectors';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Edit, Done } from '@material-ui/icons';
import ConfirmDeleteAccount from '../accounts/ConfirmDeleteAccount';
import ChangePasswordForm from '../accounts/ChangePasswordForm';
import { UserSettings } from '../redux/login/types';
import { updateUserSettings } from '../redux/login/actions';
import { useDispatch } from 'react-redux';
import { OccupationDropdown } from './OccupationDropdown';

function Settings() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [editNameMode, setEditNameMode] = useState(false);
  const [editOccMode, setOccEditMode] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [occupation, setOccupation] = useState(user.occupation);
  const settings: UserSettings = {
    name: user.name,
    occupation: user.occupation,
    notificationsEnabled: user.notificationsEnabled,
    passwordChangeRequest: null
  };

  const saveNameSetting = useCallback(() => {
    setEditNameMode(!editNameMode);
    if (editNameMode) {
      settings.name = user.name;
      dispatch(updateUserSettings(user.email, settings));
    }
  }, [editNameMode, settings, user.name, user.email, dispatch]);

  const saveOccSetting = useCallback(() => {
    setOccEditMode(!editOccMode);
    if (editOccMode) {
      settings.occupation = occupation;
      dispatch(updateUserSettings(user.email, settings));
    }
  }, [editOccMode, user.email, settings, occupation, dispatch]);

  const saveEmailNotifSetting = useCallback(() => {
    settings.notificationsEnabled = !user.notificationsEnabled;
    dispatch(updateUserSettings(user.email, settings));
  }, [user.email, settings, dispatch, user.notificationsEnabled]);

  const handleDeleteAccount = () => {
    setIsConfirmDelete(true);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const editNameIcon = editNameMode ? <Done /> : <Edit />;
  const editOccIcon = editOccMode ? <Done /> : <Edit />;

  const handleInputChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      user.name = event.target.value;
    },
    [user]
  );

  const nameVal = editNameMode ? (
    <TextField
      label="Name"
      defaultValue={user.name}
      onChange={handleInputChangeName}
    />
  ) : (
    <Typography>Name: {user.name}</Typography>
  );

  const occupationVal = editOccMode ? (
    <OccupationDropdown occupation={occupation} setOccupation={setOccupation} />
  ) : (
    <Typography>Occupation: {occupation}</Typography>
  );

  return (
    <React.Fragment>
      <SettingsTypography variant="h4"> Settings</SettingsTypography>
      <SettingsPaper elevation={8}>
        <SettingsBox>
          <AccountCircle fontSize="large" />
          <IconButton disabled>
            <Edit />
          </IconButton>
        </SettingsBox>
        <Divider variant="middle" />
        <SettingsBox>
          {nameVal}
          <IconButton onClick={() => saveNameSetting()}>
            {editNameIcon}
          </IconButton>
        </SettingsBox>
        <Divider variant="middle" />
        <SettingsBox>
          <Typography>Email: {user.email}</Typography>
          <IconButton disabled>
            <Edit />
          </IconButton>
        </SettingsBox>
        <Divider variant="middle" />
        <SettingsBox>
          {occupationVal}
          <IconButton onClick={() => saveOccSetting()}>
            {editOccIcon}
          </IconButton>
        </SettingsBox>
        <Divider variant="middle" />
        <SettingsBox>
          <Typography>Email Notifications:</Typography>
          <Switch
            checked={user.notificationsEnabled || false}
            onChange={saveEmailNotifSetting}
          />
        </SettingsBox>
        <CenterBox>
          <SettingsButton
            variant="outlined"
            onClick={handleChangePassword}
            disabled={user.isThirdParty}
          >
            Change Password
          </SettingsButton>
          <ChangePasswordForm
            isChangingPassword={isChangingPassword}
            setIsChangingPassword={setIsChangingPassword}
            setStatusText={setStatusText}
          ></ChangePasswordForm>
          <SettingsDeleteButton
            variant="contained"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </SettingsDeleteButton>
          <ConfirmDeleteAccount
            isConfirmDelete={isConfirmDelete}
            setIsConfirmDelete={setIsConfirmDelete}
            setStatusText={setStatusText}
          ></ConfirmDeleteAccount>
        </CenterBox>
        {statusText !== '' ? (
          <Typography variant="body1" align="center">
            {statusText}
          </Typography>
        ) : null}
      </SettingsPaper>
    </React.Fragment>
  );
}

const SettingsPaper = styled(Paper)({
  marginLeft: '300px',
  marginRight: '300px'
});

const SettingsTypography = styled(Typography)({
  marginTop: '25px',
  marginBottom: '15px',
  marginLeft: '300px'
});

const AccountCircle = styled(AccountCircleIcon)({
  height: '50px',
  width: '50px'
});

const SettingsBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'space-between',
  marginLeft: '30px',
  marginRight: '30px',
  marginTop: '5px',
  marginBottom: '5px'
});

const CenterBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'space-around'
});

const SettingsButton = styled(Button)({
  margin: '10px'
});

const SettingsDeleteButton = styled(Button)({
  margin: '10px',
  background: 'rgb(255,89,10)',
  color: 'white'
});

export default Settings;
