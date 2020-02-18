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

// export function DatePickers() {
//   const classes = useStyles();
//   // A bad fix I have in mind is to make duplicate buttons with changed labels
//   // Other option in mind right now is passing components to let it change the value itself
//   // I think the term for this is Higher Order Components
//   return (
//     <form className={classes.root} noValidate>
//       <MaterialUIPickers />
//       <MaterialUIPickers />
//     </form>
//   );
// }

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
