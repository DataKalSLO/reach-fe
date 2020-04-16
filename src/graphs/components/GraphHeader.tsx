import { Grid } from '@material-ui/core';
import { Delete, Edit, FileCopy, Save } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '../../common/components/IconButton';
import {
  deleteGraphAction,
  duplicateGraphAction
} from '../../redux/graphs/actions';
import { DEFAULT_KEY } from './constants';
import { useGraphHeaderStyles } from './styles';
import { GraphHeaderProps } from './types';

/*
 * Contains the buttons rendered on the header of a graph.
 * Note: defaultFlag is only used to prevent the user from
 *       deleting and duplicating the default graph. This
 *       will get removed when we connect to the backend.
 */

function GraphHeader({ graph }: GraphHeaderProps) {
  const classes = useGraphHeaderStyles();
  const dispatch = useDispatch();
  // TODO: change the way default graphs are handled
  const defaultFlag = graph.id === DEFAULT_KEY;

  return (
    <Grid container className={classes.root}>
      <IconButton
        style={{ color: 'error' }}
        ariaLabel={'delete graph'}
        icon={<Delete />}
        onClick={() => {
          if (!defaultFlag) {
            dispatch(deleteGraphAction(graph.id));
          }
        }}
      />
      <IconButton
        ariaLabel={'save graph'}
        icon={<Save />}
        onClick={() => alert('Not implemented')}
      />
      <IconButton
        ariaLabel={'edit graph'}
        icon={<Edit />}
        onClick={() => alert('Not implemented')}
      />
      <IconButton
        ariaLabel={'duplicate graph'}
        icon={<FileCopy />}
        onClick={() => {
          if (!defaultFlag) {
            dispatch(duplicateGraphAction(graph.options));
          }
        }}
      />
    </Grid>
  );
}

export default GraphHeader;
