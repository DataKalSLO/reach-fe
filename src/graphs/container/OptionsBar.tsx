import { BottomNavigationAction, Drawer } from '@material-ui/core';
import { ArrowUpward, Close, InsertChart } from '@material-ui/icons';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '../../reach-ui/core';
import { getAllUserGraphs } from '../../redux/graphbuilder/actions';
import OptionsButtons from '../components/OptionsButtons';
import { INITIATIVE_DESC, MY_GRAPHS_LABEL } from './constants';
import {
  StyledBottomNav,
  StyledPopover,
  StyledTypography,
  useOptionsStyles
} from './styles';

/*
 * The toolbar that displays a button for each initiative.
 * Clicking on an initiative will replace any existing graphs
 * with the set of graphs corresponding to the chosen initiative.
 * Note: The default graph does not get replaced.
 */

function OptionsBar() {
  const dispatch = useDispatch();
  const classes = useOptionsStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const popoverIsOpen = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <IconButton
        aria-label="Expand Options Bar"
        icon={<ArrowUpward />}
        area-describeby={id}
        onClick={toggleDrawer}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={clsx(classes.menuButton, open && classes.hide)}
      />
      <StyledPopover
        id={id}
        open={popoverIsOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <StyledTypography>{INITIATIVE_DESC}</StyledTypography>
      </StyledPopover>
      <Drawer
        anchor="bottom"
        variant="persistent"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <StyledBottomNav showLabels>
          <BottomNavigationAction
            color="error"
            onClick={toggleDrawer}
            label="Exit"
            icon={<Close fontSize="large" color="error" />}
          />
          <OptionsButtons />
          <BottomNavigationAction
            color="default"
            onClick={() => dispatch(getAllUserGraphs())}
            label={MY_GRAPHS_LABEL}
            icon={<InsertChart fontSize="large" />}
          />
        </StyledBottomNav>
      </Drawer>
    </Fragment>
  );
}

export default OptionsBar;
