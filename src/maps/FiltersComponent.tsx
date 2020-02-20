import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MaterialUIPickers from '../common/components/DatePicker';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  })
);

export function DatePickers() {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate>
      <MaterialUIPickers id="start-picker" label="start-date-picker" />
      <MaterialUIPickers id="end-picker" label="end-date-picker" />
    </form>
  );
}

export default function BasicButtonGroup() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button>Region</Button>
        <Button>City</Button>
        <Button>Zip Code</Button>
      </ButtonGroup>
    </div>
  );
}
