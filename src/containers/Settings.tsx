import React from 'react';
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

function Settings() {
  const user = useSelector(getUser);
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
        <IndividualSetting settingName="Occupation" userInfo={user.role} />
        <IndividualSetting settingName="Email Notifications" userInfo="" />
        <CenterBox>
          <SettingsButton variant="outlined">Reset Password</SettingsButton>
          <SettingsButton variant="outlined">Delete Account</SettingsButton>
        </CenterBox>
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

export default Settings;
