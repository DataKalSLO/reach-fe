import React, { Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { getGraphs } from '../../redux/graphs/selector';

function GraphEdit() {
  const graphState = useSelector(getGraphs);
//  const dispatch = useDispatch();
  const classes = useGraphEditStyles();

  return (
    <Fragment>
      <Drawer
        className={clsx(classes.drawer, !graphState.isEditing && classes.hide)}
        anchor={'bottom'}
        variant="persistent"
        open={graphState.isEditing}
        classes={{ paper: classes.drawerPaper }}
      >
        <IconButton
          onClick={() => alert('Not Implemented')}
          className={classes.button}
        >
          <Close fontSize={'default'} />
        </IconButton>
      </Drawer>
    </Fragment>
  );
}

export default GraphEdit;

const useGraphEditStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    drawer: {
      width: '100%',
      backgroundColor: 'transparent',
      flexShrink: 0
    },
    drawerPaper: {
      position: 'absolute',
      bottom: 0,
      height: '60%',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      border: '1px solid slategrey',
      margin: '20px'
    },
    hide: {
      display: 'none'
    },
    button: {
      position: 'absolute',
      top: 0,
      right: 0,
      color: 'red',
      backgroundColor: 'white',
      margin: theme.spacing(1),
      boxShadow: theme.shadows[5]
    }
  })
);
