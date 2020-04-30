import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { Close } from '@material-ui/icons';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { editingGraphAction } from '../../redux/graphs/actions';
import GraphEditForm from './GraphEditForm';
import { GraphHeaderProps } from './types';

function GraphEdit({ graph }: GraphHeaderProps) {
  const dispatch = useDispatch();
  const classes = useGraphEditStyles();
  return (
    <Fragment>
      <Drawer
        className={clsx(classes.drawer, !graph.isEditing && classes.hide)}
        anchor={'bottom'}
        variant="persistent"
        open={graph.isEditing}
        classes={{ paper: classes.drawerPaper }}
      >
        <GraphEditForm />
        <IconButton
          onClick={() => dispatch(editingGraphAction(graph.id))}
          className={classes.button}
          size="small"
        >
          <Close />
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
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      border: '1px solid slategrey',
      padding: '20px',
      margin: '10px'
    },
    hide: {
      display: 'none'
    },
    button: {
      position: 'absolute',
      top: 0,
      right: 0,
      color: 'red',
      margin: theme.spacing(1)
    }
  })
);
