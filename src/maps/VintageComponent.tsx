import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    chip: {
      margin: theme.spacing(0.5)
    }
  })
);

const vintage = 2020;

export default function VintageComponent() {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <div> Vintage: </div>
      <Chip size="small" label={vintage} />
    </Paper>
  );
}