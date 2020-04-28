import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/login/selectors';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Divider, styled } from '@material-ui/core';
import { logoutAction } from '../redux/login/actions';
import { SETTINGS } from '../nav/constants';
import { useHistory } from 'react-router-dom';

interface AccountDropdownProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function AccountDropdown(props: AccountDropdownProps) {
  const history = useHistory();
  const user = useSelector(getUser);
  const navigateTo = (route: string) => () => history.push(route);
  const handleClose = () => {
    props.setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const logout = () => {
    props.setAnchorEl(null);
    dispatch(logoutAction());
  };

  return (
    <StyledMenu
      id="menu"
      anchorEl={props.anchorEl}
      open={Boolean(props.anchorEl)}
      onClose={handleClose}
    >
      <StyledMenuItem onClick={handleClose}>
        Signed in as <br /> {user.email}
      </StyledMenuItem>
      <Divider />
      <StyledMenuItem onClick={navigateTo(SETTINGS)}>Settings</StyledMenuItem>
      <Divider />
      <StyledMenuItem onClick={logout}>Logout</StyledMenuItem>
    </StyledMenu>
  );
}

const StyledMenu = styled(Menu)({
  marginTop: '30px'
});

const StyledMenuItem = styled(MenuItem)({
  whiteSpace: 'initial'
});

AccountDropdown.propTypes = {
  anchorEl: PropTypes.element.isRequired,
  setAnchorEl: PropTypes.element.isRequired
};

export default AccountDropdown;
