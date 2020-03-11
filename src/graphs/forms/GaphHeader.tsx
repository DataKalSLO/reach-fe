import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useGraphHeaderStyles } from '../container/styles';
import { Delete, Save, FileCopy, Edit } from '@material-ui/icons';
import GraphShareButton from './GraphShareButton';
import * as typs from './types';
import * as cnst from './constants';
import * as actions from '../../redux/graphs/actions';

/*
 * Contains the buttons rendered on the header of a graph.
 */

function GraphHeader({ graphId }: typs.GraphHeaderProps) {
  const classes = useGraphHeaderStyles();
  const dispatch = useDispatch();

  return (
    <Grid container className={classes.root}>
      <Button
        variant="contained"
        className={classes.button}
        style={{ color: 'red' }}
        startIcon={<Delete />}
        onClick={() => dispatch(actions.deleteGraphAction(graphId))}
      >
        {cnst.DELETE_LABEL}
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<Save />}
      >
        {cnst.SAVE_LABEL}
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<Edit />}
        onClick={() => dispatch(actions.editGraphAction(true))}
      >
        {cnst.EDIT_LABEL}
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<FileCopy />}
        onClick={() => dispatch(actions.duplicateGraphAction(graphId))}
      >
        {cnst.DUPLICATE_LABEL}
      </Button>
      <GraphShareButton />
    </Grid>
  );
}

export default GraphHeader;
