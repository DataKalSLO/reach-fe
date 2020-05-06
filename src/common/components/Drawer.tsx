import { Drawer as CoreDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { theme } from '../../theme/theme';

interface Props {
  width: number;
  children: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const useStyles = makeStyles({
  drawer: {
    width: (props: Props) => props.width,
    flexShrink: 0
  },
  drawerPaper: {
    width: props => props.width,
    zIndex: 0, // to place drawer behind app bar
    backgroundColor: theme.palette.secondary.light,
    paddingTop: 100 // padding to place buttons beneath app bar
  }
});

export default function Drawer(props: Props) {
  const classes = useStyles(props);

  return (
    <CoreDrawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{
        // styling for drawer must be done with drawer's child paper element,
        // and cannot be done with styled components
        // https://material-ui.com/guides/interoperability/#deeper-elements-3
        paper: classes.drawerPaper
      }}
    >
      {props.children}
    </CoreDrawer>
  );
}
