import React, { Fragment } from 'react';
import clsx from 'clsx';
import {IconButton} from '../../common/components/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Popover from '@material-ui/core/Popover';
import OptionsButtons from '../components/OptionsButtons';
import { useOptionsStyles } from './styles';
import { Close, ArrowUpward } from '@material-ui/icons';
import { INITIATIVE_DESC } from './constants';
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography
} from '@material-ui/core';

/*
 * The toolbar that displays a button for each initiative.
 * Clicking on an initiative will replace any existing graphs
 * with the set of graphs corresponding to the chosen initiative.
 * Note: The default graph does not get replaced.
 */

function OptionsBar() {
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton
        ariaLabel={'expand options bar'}
        icon={<ArrowUpward />}
        area-describeby={id}
        onClick={handleDrawerOpen}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={clsx(classes.menuButton, open && classes.hide)}
      />
      <Popover
        className={classes.popover}
        id={id}
        open={popoverIsOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Typography className={classes.typography}>
          {INITIATIVE_DESC}
        </Typography>
      </Popover>
      <Drawer
        className={classes.drawer}
        anchor="bottom"
        variant="persistent"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <BottomNavigation showLabels className={classes.nav}>
          <BottomNavigationAction
            onClick={handleDrawerClose}
            label="Exit"
            icon={<Close fontSize={'large'} />}
            style={{ color: 'red' }}
          />
          <OptionsButtons />
        </BottomNavigation>
      </Drawer>
    </Fragment>
  );
}

export default OptionsBar;
