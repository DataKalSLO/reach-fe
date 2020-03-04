import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

interface Sources {
  key: number;
  label: string;
}

//TODO: use mui styled instead of makestyles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
      '& > *': {
        margin: theme.spacing(0.5)
      }
    },
    chip: {
      margin: theme.spacing(0.5)
    }
  })
);

//hard coded sources
const sources = [
  { key: 0, label: 'City of SLO' },
  { key: 1, label: 'City of Santa Maria' }
];

export default function SourceLabels() {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <div> Data Sources: </div>
      {sources.map(data => {
        return <Chip size="small" label={data.label} key={data.key} />;
      })}
    </Paper>
  );
}
