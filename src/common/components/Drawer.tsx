import { Drawer as CoreDrawer, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import { theme } from '../../theme/theme';
import { IconButton } from './IconButton';

// drawerOpen and drawerClode styling copied from material ui demo
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
  children: any;
  collapsible?: boolean;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const IS_DRAWER_OPEN_DEFAULT = true;

export default function Drawer(props: Props) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(IS_DRAWER_OPEN_DEFAULT);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const CollapsibleIcon = () => {
    if (props.collapsible) {
      const chevronIcon =
        props.anchor === 'right' ? <ChevronRight /> : <ChevronLeft />;
      const chevronPosition = props.anchor === 'right' ? 'right' : 'left';

      return (
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
      {...props}
    >
      <CollapsibleIcon />
      {props.children}
    </CoreDrawer>
  );
}
