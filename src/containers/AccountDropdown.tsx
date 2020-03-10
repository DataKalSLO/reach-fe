import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/login/selectors';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Divider, styled } from '@material-ui/core';
import { logoutAction } from '../redux/login/actions';

interface AccountDropdownProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function AccountDropdown(props: AccountDropdownProps) {
  const user = useSelector(getUser);
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
