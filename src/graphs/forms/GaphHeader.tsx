import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useGraphHeaderStyles } from '../container/styles';
import { Delete, Save, FileCopy, Edit } from '@material-ui/icons';
import GraphShareButton from './GraphShareButton';
import GraphFormattingButton from './GraphFormattingButton';
import * as cnst from './constants';
import {Theme } from '@material-ui/core/styles';

/*
 * Contains the buttons rendered on the header of a graph.
 */

function GraphHeader() {
  const classes = useGraphHeaderStyles();
  const [graphOriginal, setGraphCopy] = React.useState(false);

  const handleGraphCopy = () => {
    setGraphCopy(true);
  };

  return (
    <Grid container className={classes.root}>
      <Button
        variant="contained"
        className={classes.button}
        style={{ color: 'red' }}
        startIcon={<Delete />}
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
      >
        {cnst.EDIT_LABEL}
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<FileCopy />}
        onClick={handleGraphCopy}
      >
        {cnst.DUPLICATE_LABEL}
      </Button>
      <GraphShareButton />
      <GraphFormattingButton/>
    </Grid>
  );
}

export default GraphHeader;
