import { Drawer as CoreDrawer, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import { IconButton } from '../../reach-ui/core';
import { theme } from '../../theme/theme';

// drawerOpen and drawerClose styling copied from Material UI demo
// https://material-ui.com/components/drawers/#mini-variant-drawer
const useStyles = makeStyles({
  drawer: {
    flexShrink: 0,
    zIndex: 2 // to place drawer behind app bar and in front of page content
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
      width: theme.spacing(10) + 1
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    whiteSpace: 'nowrap'
  }
});

interface Props {
  width: number;
  children: JSX.Element | JSX.Element[];
  isCollapsible?: boolean;
  showLabels?: boolean;
  anchor?: 'left' | 'right';
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function Drawer(props: Props) {
  const classes = useStyles(props);
  /* defaults to show labels
   * FIXME: drawer forgets open/closed state when isCollapsible=true AND using PersistentDrawer
   */
  const [open, setOpen] = useState(
    props.showLabels !== undefined ? props.showLabels : true
  );

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // icon used to open/close the drawer
  const CollapsibleIcon = () => {
    if (props.isCollapsible) {
      // selects the chevron with the appropriate direction
      // based on which side side of the screen the drawer is anchored
      const chevronIcon =
        props.anchor === 'right' ? <ChevronRight /> : <ChevronLeft />;
      const chevronPosition = props.anchor === 'right' ? 'right' : 'left';

      return (
        // wrapped in List component so ripple formatting on icon doesn't get distorted
        <List>
          <IconButton
            aria-label={'toggle drawer'}
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
  const { isCollapsible, showLabels, ...otherProps } = props;

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
          [classes.drawerClose]: !open || !isCollapsible
        })
      }}
      {...otherProps}
    >
      <CollapsibleIcon />
      {props.children}
    </CoreDrawer>
  );
}
