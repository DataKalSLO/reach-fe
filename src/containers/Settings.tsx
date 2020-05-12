import React, { useState } from 'react';
import {
  Paper,
  Typography,
  IconButton,
  Divider,
  Box,
  Button,
  styled
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/login/selectors';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import IndividualSetting from './IndividualSetting';
import ConfirmDeleteAccount from '../accounts/ConfirmDeleteAccount';

function Settings() {
  const user = useSelector(getUser);
  const [displayError, setDisplayError] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const handleDeleteAccount = () => {
    setIsConfirmDelete(true);
  };

  return (
    <React.Fragment>
      <SettingsTypography variant="h4"> Settings</SettingsTypography>
      <SettingsPaper elevation={8}>
        <SettingsBox>
          <AccountCircle fontSize="large" />
          <IconButton>
            <EditIcon />
          </IconButton>
        </SettingsBox>
        <Divider variant="middle" />
        <IndividualSetting settingName="Name" userInfo={user.name} />
        <IndividualSetting settingName="Email" userInfo={user.email} />
        <IndividualSetting
          settingName="Occupation"
          userInfo={user.occupation}
        />
        <IndividualSetting settingName="Email Notifications" userInfo="" />
        <CenterBox>
          <SettingsButton variant="outlined">Reset Password</SettingsButton>
          <SettingsDeleteButton
            variant="contained"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </SettingsDeleteButton>
          <ConfirmDeleteAccount
            isConfirmDelete={isConfirmDelete}
            setIsConfirmDelete={setIsConfirmDelete}
            setDisplayError={setDisplayError}
          ></ConfirmDeleteAccount>
        </CenterBox>
        {displayError ? (
          <Typography variant="body1" color="error" align="center">
            Error when deleting account. Please try again later.
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
