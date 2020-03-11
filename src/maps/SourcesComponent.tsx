import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { SourceComponentProps } from './MapTypes';

//TODO: use mui styled instead of makestyles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'left',
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

export default function SourceLabels(props: SourceComponentProps) {
  const classes = useStyles();
  const { dataSources } = props;

  return (
    <Paper className={classes.root} elevation={0}>
      <div> Data Sources: </div>
      {dataSources.map(data => {
        return <Chip size="small" label={data.label} key={data.key} />;
      })}
    </Paper>
  );
}
