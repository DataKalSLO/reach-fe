import React from 'react';
import GraphShareButton from './GraphShareButton';
import { useDispatch } from 'react-redux';
import { useGraphHeaderStyles } from './styles';
import { Grid, Button } from '@material-ui/core';
import { Delete, Save, FileCopy, Edit } from '@material-ui/icons';
import * as actions from '../../redux/graphs/actions';
import * as consts from './constants';
import * as types from './types';

/*
 * Contains the buttons rendered on the header of a graph.
 * Note: defaultFlag is only used to prevent the user from
 *       deleting and duplicating the default graph. This
 *       will get removed when we connect to the backend.
 */

function GraphHeader({ graph }: types.GraphHeaderProps) {
  const classes = useGraphHeaderStyles();
  const dispatch = useDispatch();
  const defaultFlag = graph.id === consts.DEFAULT_KEY;

  return (
    <Grid container className={classes.root}>
      <Button
        variant="contained"
        className={classes.button}
        style={{ color: 'red' }}
        startIcon={<Delete />}
        onClick={() => {
          if (!defaultFlag) {
            dispatch(actions.deleteGraphAction(graph.id));
          }
        }}
      >
        {consts.DELETE_LABEL}
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<Save />}
        onClick={() => alert('Not implemented')}
      >
        {consts.SAVE_LABEL}
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<Edit />}
        onClick={() => alert('Not implemented')}
      >
        {consts.EDIT_LABEL}
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<FileCopy />}
        onClick={() => {
          if (!defaultFlag) {
            dispatch(actions.duplicateGraphAction(graph.options));
          }
        }}
      >
        {consts.DUPLICATE_LABEL}
      </Button>
      <GraphShareButton />
    </Grid>
  );
}

export default GraphHeader;
