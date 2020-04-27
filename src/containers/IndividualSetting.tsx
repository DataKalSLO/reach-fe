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

interface IndividualSettingProps {
  settingName: string;
  userInfo: string;
}

function IndividualSetting(props: IndividualSettingProps) {
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
      <IconButton onClick={() => setEditMode(!editMode)}>{editIcon}</IconButton>
    );

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
  userInfo: PropTypes.element.isRequired
};

export default IndividualSetting;
