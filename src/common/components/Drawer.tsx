import { Drawer as CoreDrawer } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      zIndex: 2, // to place drawer behind app bar and in front of page contents
      backgroundColor: theme.palette.secondary.light,
      paddingTop: 100 // padding to place buttons beneath app
    }
  })
);

interface Props {
  children: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function Drawer(props: Props) {
  const classes = useStyles();
  return (
    <CoreDrawer
      variant="permanent"
      anchor="left"
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
