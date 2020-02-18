import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialUIPickers from '../common/components/DatePicker';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex'
    }
  })
);

export function DatePickers() {
  const classes = useStyles();
  // A bad fix I have in mind is to make duplicate buttons with changed labels
  // Other option in mind right now is passing components to let it change the value itself
  // I think the term for this is Higher Order Components
  return (
    <form className={classes.container} noValidate>
      <MaterialUIPickers />
      <MaterialUIPickers />
    </form>
  );
}

export default DatePickers;
