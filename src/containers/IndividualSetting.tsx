import React, { useCallback, useState } from 'react';
import {
  Typography,
  IconButton,
  Box,
  Switch,
  TextField,
  Divider,
  styled
} from '@material-ui/core';
import { Edit, Done } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { UserSettings } from '../redux/login/types';
import { updateUserSettings } from '../redux/login/actions';
import { useDispatch } from 'react-redux';

interface IndividualSettingProps {
  settingName: string;
  userInfo: string;
  email: string;
  settings: UserSettings;
}

function IndividualSetting(props: IndividualSettingProps) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState(props.userInfo);

  const handleInputChangeUserInfo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo(event.target.value);
    },
    [setUserInfo]
  );

  const editIcon = editMode ? <Done /> : <Edit />;

  const rightSettingsIcon =
    props.userInfo === '' ? (
      <Switch />
    ) : (
      <IconButton onClick={() => saveSetting()}>{editIcon}</IconButton>
    );

  const saveSetting = useCallback(() => {
    setEditMode(!editMode);
    if (editMode) {
      if (props.settingName === 'Name') {
        props.settings.name = userInfo;
      } else if (props.settingName === 'Occupation') {
        props.settings.occupation = userInfo;
      } else if (props.settingName === 'Email Notifications') {
        //add later
      }
      console.log(props.settings);
      dispatch(updateUserSettings(props.email, props.settings));
    }
  }, [
    editMode,
    props.settingName,
    props.email,
    props.settings,
    userInfo,
    dispatch
  ]);

  const leftSettingsVal = editMode ? (
    <TextField
      label={props.settingName}
      defaultValue={userInfo}
      onChange={handleInputChangeUserInfo}
    />
  ) : (
    <Typography>
      {props.settingName}: {userInfo}
    </Typography>
  );

  return (
    <React.Fragment>
      <SettingsBox>
        {leftSettingsVal}
        {rightSettingsIcon}
      </SettingsBox>
      <Divider variant="middle" />
    </React.Fragment>
  );
}

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

IndividualSetting.propTypes = {
  settingName: PropTypes.element.isRequired,
  userInfo: PropTypes.element.isRequired,
  email: PropTypes.element.isRequired
};

export default IndividualSetting;
