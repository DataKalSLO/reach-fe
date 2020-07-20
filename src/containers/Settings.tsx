import { Checkbox, Grid, Typography } from '@material-ui/core';
import { AccountCircle, Done, Edit } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChangePasswordForm from '../accounts/ChangePasswordForm';
import ConfirmDeleteAccount from '../accounts/ConfirmDeleteAccount';
import { Button, ContentBox, IconButton, TextField } from '../reach-ui/core';
import { updateUserSettings } from '../redux/login/actions';
import { getUser } from '../redux/login/selectors';
import { UserSettings } from '../redux/login/types';
import { OccupationDropdown, OCCUPATIONS_BY_KEY } from './OccupationDropdown';

function Settings() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [editNameMode, setEditNameMode] = useState(false);
  const [editOccMode, setOccEditMode] = useState(false);
  const [displayError, setDisplayError] = useState(false);
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

  const SettingsGridItem = (props: {
    children: JSX.Element | JSX.Element[];
    justify?: 'space-around' | 'space-between';
  }) => {
    return (
      <Grid
        container
        item
        alignItems="center"
        justify={props.justify ? props.justify : 'space-between'}
      >
        {props.children}
      </Grid>
    );
  };

  const GridItemText = (props: { label: string; value?: string }) => {
    return (
      <Typography>
        <b>{props.label}: </b> {props.value}
      </Typography>
    );
  };

  const EditButton = (props: {
    aria: string;
    icon?: JSX.Element;
    disabled?: boolean;
    onClick?: () => void;
  }) => {
    return (
      <IconButton
        size="small"
        aria-label={props.aria}
        icon={props.icon ? props.icon : <Edit />}
        {...props}
      />
    );
  };

  const Name = () => {
    if (editNameMode) {
      return (
        <TextField
          label="Name"
          defaultValue={user.name}
          onChange={handleInputChangeName}
        />
      );
    } else {
      return <GridItemText label="Name" value={user.name} />;
    }
  };

  const Email = () => {
    return <GridItemText label="Email" value={user.email} />;
  };

  const Occupation = () => {
    if (editOccMode) {
      return (
        <OccupationDropdown
          occupation={occupation}
          setOccupation={setOccupation}
        />
      );
    } else {
      return (
        <GridItemText
          label="Occupation"
          value={OCCUPATIONS_BY_KEY[occupation]}
        />
      );
    }
  };

  const ChangePasswordButton = () => {
    return (
      <React.Fragment>
        <Button
          variant="outlined"
          label="Change Password"
          onClick={handleChangePassword}
          disabled={user.isThirdParty}
        />
        <ChangePasswordForm
          isChangingPassword={isChangingPassword}
          setIsChangingPassword={setIsChangingPassword}
        ></ChangePasswordForm>
      </React.Fragment>
    );
  };

  const DeleteAccountButton = () => {
    return (
      <React.Fragment>
        <Button
          label="Delete Account"
          onClick={handleDeleteAccount}
          style={{ background: 'red', text: 'white' }}
        />
        <ConfirmDeleteAccount
          isConfirmDelete={isConfirmDelete}
          setIsConfirmDelete={setIsConfirmDelete}
          setDisplayError={setDisplayError}
        ></ConfirmDeleteAccount>
        {displayError ? (
          <Typography variant="body1" color="error" align="center">
            Error when deleting account. Please try again later.
          </Typography>
        ) : null}
      </React.Fragment>
    );
  };

  return (
    <ContentBox>
      <Typography variant="h3" component="h1" gutterBottom>
        Settings
      </Typography>
      <Grid lg={5}>
        <SettingsGridItem>
          {/* TODO: make the photo bigger once it's the user's actual profile pic */}
          <AccountCircle fontSize="large" color="disabled" />
          <EditButton aria="edit profile picture" disabled />
        </SettingsGridItem>

        <SettingsGridItem>
          <Name />
          <EditButton
            aria="edit name"
            onClick={() => saveNameSetting()}
            icon={editNameIcon}
          />
        </SettingsGridItem>

        <SettingsGridItem>
          <Email />
          <EditButton disabled aria="edit email" />
        </SettingsGridItem>

        <SettingsGridItem>
          <Occupation />
          <EditButton
            aria="edit occupation"
            onClick={() => saveOccSetting()}
            icon={editOccIcon}
          />
        </SettingsGridItem>

        <SettingsGridItem>
          <GridItemText label="Email Notifications" />
          <Checkbox
            color="primary"
            checked={user.notificationsEnabled || false}
            onChange={saveEmailNotifSetting}
            style={{ marginRight: '5px' }} // hack to make it align with the other icons
          />
        </SettingsGridItem>

        <SettingsGridItem justify="space-around">
          <ChangePasswordButton />
          <DeleteAccountButton />
        </SettingsGridItem>
      </Grid>
    </ContentBox>
  );
}

export default Settings;
