import { Drawer as CoreDrawer, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import { theme } from '../../theme/theme';
import { IconButton } from './IconButton';

// drawerOpen and drawerClose styling copied from Material UI demo
// https://material-ui.com/components/drawers/#mini-variant-drawer
const useStyles = makeStyles({
  drawer: {
    flexShrink: 0,
    zIndex: 0 // to place drawer behind app bar
  },
  drawerPaper: {
    backgroundColor: theme.palette.secondary.light,
    paddingTop: 75 // padding to place buttons beneath app bar
  },
  drawerOpen: {
    width: (props: Props) => props.width,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
});

interface Props {
  width: number;
  children: JSX.Element | JSX.Element[];
  isCollapsible?: boolean;
  anchor?: 'left' | 'right';
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function Drawer(props: Props) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(true); // drawer is open by default

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // icon used to open/close the drawer
  const CollapsibleIcon = () => {
    if (props.isCollapsible) {
      // selects the chevron with the apprpriate direction
      // based on which side side of the screen the drawer is anchored
      const chevronIcon =
        props.anchor === 'right' ? <ChevronRight /> : <ChevronLeft />;
      const chevronPosition = props.anchor === 'right' ? 'right' : 'left';

      return (
        // wrapped in List Component so ripple formatting on icon doesn't get distored
        <List>
          <IconButton
            aria-label={'test'}
            color={'default'}
            icon={open ? chevronIcon : <Menu />}
            onClick={toggleDrawer}
            style={{ float: chevronPosition }}
          />
        </List>
      );
    } else return null;
  };

  // non-standard props filtered out so otherProps can be passed Material UI Drawer component
  const { isCollapsible, ...otherProps } = props;

  return (
    <CoreDrawer
      variant="permanent"
      anchor="left"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerPaper]: true, // using true so this style is always applied
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
      {...otherProps}
    >
      <CollapsibleIcon />
      {props.children}
    </CoreDrawer>
  );
}
