import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      zIndex: 0, // to place drawer behind app bar
      backgroundColor: theme.palette.secondary.light,
      paddingTop: 100 // padding to place buttons beneath app
    }
  })
);

interface Props {
  children: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function Sidebar(props: Props) {
  const classes = useStyles();
  return (
    <Drawer
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
    </Drawer>
  );
}
