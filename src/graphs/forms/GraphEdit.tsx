import React, { Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { useGraphEditStyles } from '../container/styles';
import { IconButton } from '@material-ui/core';
import { getGraphs } from '../../redux/graphs/selector';
import { Close } from '@material-ui/icons';
import { editGraphAction } from '../../redux/graphs/actions';
import { EditFormProps } from './types';
import GraphEditForm from './GraphEditForm';

function GraphEdit({ graphs }: EditFormProps) {
  const graphState = useSelector(getGraphs);
  const dispatch = useDispatch();
  const classes = useGraphEditStyles();

  return (
    <Fragment>
      <Drawer
        className={clsx(classes.drawer, !graphState.isEditting && classes.hide)}
        anchor={'bottom'}
        variant="persistent"
        open={graphState.isEditting}
        classes={{ paper: classes.drawerPaper }}
      >
        <GraphEditForm graphs={graphs} />
        <IconButton
          onClick={() => dispatch(editGraphAction(false))}
          className={classes.button}
        >
          <Close fontSize={'default'} />
        </IconButton>
      </Drawer>
    </Fragment>
  );
}

export default GraphEdit;
