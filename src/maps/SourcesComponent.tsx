import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

interface Sources {
  key: number;
  label: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5)
    },
    chip: {
      margin: theme.spacing(0.5)
    }
  })
);

export default function SourceLabels() {
  const classes = useStyles();
  const [Sources, setSources] = React.useState<Sources[]>([
    { key: 0, label: 'City of SLO' },
    { key: 1, label: 'City of Santa Maria' }
  ]);

  return (
    <Paper className={classes.root} elevation={0}>
      <div> Data Sources: </div>
      {Sources.map(data => {
        let icon;
        return (
          <Chip
            size="small"
            key={data.key}
            icon={icon}
            label={data.label}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}
