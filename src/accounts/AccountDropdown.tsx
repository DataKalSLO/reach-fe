import { Divider, MenuItem, styled } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SETTINGS } from '../nav/constants';
import { Menu } from '../reach-ui/core';
import { logoutAction } from '../redux/login/actions';
import { getUser } from '../redux/login/selectors';

interface AccountDropdownProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export default function AccountDropdown(props: AccountDropdownProps) {
  const history = useHistory();
  const user = useSelector(getUser);
  const navigateTo = (route: string) => history.push(route);
  const handleClose = () => {
    props.setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const logout = () => {
    handleClose();
    dispatch(logoutAction());
  };
  const navigateAndCloseDropdown = (route: string) => () => {
    navigateTo(route);
    handleClose();
  };

  return (
    <Menu
      id="user-settings-menu"
      anchorEl={props.anchorEl}
      setAnchorEl={props.setAnchorEl}
      open={Boolean(props.anchorEl)}
      onClose={handleClose}
      marginTop="30px"
    >
      <StyledMenuItem onClick={handleClose}>
        Signed in as <br /> {user.email}
      </StyledMenuItem>
      <Divider />
      <StyledMenuItem onClick={navigateAndCloseDropdown(SETTINGS)}>
        Settings
      </StyledMenuItem>
      <Divider />
      <StyledMenuItem onClick={logout}>Logout</StyledMenuItem>
    </Menu>
  );
}

const StyledMenuItem = styled(MenuItem)({
  whiteSpace: 'initial'
});

AccountDropdown.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired
};
