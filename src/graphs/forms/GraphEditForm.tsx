import React from 'react';
import { Container, Divider, Button } from '@material-ui/core';
import { EditFormProps } from './types';
import { useEditFormStyles } from '../container/styles';
import {
  FormGroup,
  Switch,
  FormControlLabel,
  TextField
} from '@material-ui/core';
import * as cnst from './constants';

function GraphEditForm({ graphs }: EditFormProps) {
  const classes = useEditFormStyles();
  return (
    <Container className={classes.root}>
      <FormGroup row className={classes.form}>
        <TextField
          className={classes.field}
          id="outlined-multiline-flexible"
          label="Chart Title"
          rowsMax="2"
          variant="outlined"
        />
        <FormControlLabel
          className={classes.label}
          control={<Switch checked={false} size="medium" />}
          label={cnst.EDIT_GRIDLINES}
        />
      </FormGroup>
      <Divider variant="middle" />
      <Button className={classes.button} color="primary" variant="contained">
        {' '}
        {cnst.EDIT_SUBMIT_BUTTON}
      </Button>
    </Container>
  );
}

export default GraphEditForm;
