import React from 'react';
import { Paper, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// taken from material UI docs: https://material-ui.com/components/text-fields/
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  }
}));

interface Props {
  'aria-label': string; // Accessible label that describes button's purpose
  placeholder: string; // Placeholder text that appears while out of focus
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Optional properties that gave me a TS error when I removed them from this interface

  // Function that is called when input value changes
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  // Function that is called when key is pressed
  onKeyPress?: (e: React.KeyboardEvent) => void;
  button?: JSX.Element; // Button that will show up at end of text field
}

export default function TextField(props: Props) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={props.placeholder}
        aria-label={props['aria-label']}
        {...props}
      />
      {props.button}
    </Paper>
  );
}
